import React from 'react';
import { OverlappingPentagons, CalendarVisual } from '../components/ClinicalVisuals';

// ─── Dynamic Client Date & Time Orientation Helpers ──────────────────────────
export const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const DAY_NAMES = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
        case 1:  return `${day}st`;
        case 2:  return `${day}nd`;
        case 3:  return `${day}rd`;
        default: return `${day}th`;
    }
}

/**
 * Derives accurate orientation answers and realistic options
 * based on the client's laptop date, time, and active user state.
 */
export function getDynamicOrientationData(date = new Date()) {
    const currentYear = date.getFullYear();
    const currentMonthIndex = date.getMonth(); // 0 - 11
    const currentMonthName = MONTH_NAMES[currentMonthIndex];
    const currentDayIndex = date.getDay(); // 0 - 6
    const currentDayName = DAY_NAMES[currentDayIndex];
    const currentDateNum = date.getDate(); // 1 - 31
    const currentDateStr = getOrdinalSuffix(currentDateNum);

    // Standard 4 Seasons
    let currentSeason = "Winter";
    if (currentMonthIndex >= 2 && currentMonthIndex <= 4) currentSeason = "Spring";
    else if (currentMonthIndex >= 5 && currentMonthIndex <= 7) currentSeason = "Summer";
    else if (currentMonthIndex >= 8 && currentMonthIndex <= 10) currentSeason = "Autumn";

    // 1. Year options
    const yearOptions = [
        String(currentYear - 2),
        String(currentYear - 1),
        String(currentYear),
        String(currentYear + 1)
    ];

    // 2. Season options
    const seasonOptions = ["Winter", "Spring", "Summer", "Autumn"];

    // 3. Month options: ensure currentMonthName is included in natural progression
    const monthOffsets = [-1, 0, 1, 2];
    const monthOptions = monthOffsets.map(o => MONTH_NAMES[(currentMonthIndex + o + 12) % 12]);

    // 4. Day of the week options: ensure currentDayName is included
    const dayOffsets = [-1, 0, 1, 2];
    const dayOptions = dayOffsets.map(o => DAY_NAMES[(currentDayIndex + o + 7) % 7]);

    // 5. Date of month options: ensure currentDateStr is included
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    let startDay = currentDateNum - 1;
    if (startDay < 1) startDay = 1;
    if (startDay + 3 > daysInMonth) startDay = Math.max(1, daysInMonth - 3);
    const dateOptions = [0, 1, 2, 3].map(i => getOrdinalSuffix(startDay + i));

    // 6. Identity Name
    let userName = "Dhruv Gharat";
    try {
        const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('cf_user') : null;
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (parsed?.full_name?.trim()) {
                userName = parsed.full_name.trim();
            }
        }
    } catch (_) {}

    const defaultNames = ["John Doe", "Jane Smith", "Will Smith", "Alex Mercer"];
    const filteredPool = defaultNames.filter(n => n.toLowerCase() !== userName.toLowerCase());
    const nameOptions = [userName, filteredPool[0], filteredPool[1], filteredPool[2]].sort();

    return {
        year: { correctAnswer: String(currentYear), options: yearOptions },
        season: { correctAnswer: currentSeason, options: seasonOptions },
        month: { correctAnswer: currentMonthName, options: monthOptions },
        day: { correctAnswer: currentDayName, options: dayOptions },
        date: { correctAnswer: currentDateStr, options: dateOptions },
        identity: { correctAnswer: userName, options: nameOptions }
    };
}

// ─── MMSE Diagnostic Questions ───────────────────────────────────────────────
export function getMMSEQuestions(date = new Date()) {
    const dyn = getDynamicOrientationData(date);

    return [
        // 1️⃣ Orientation to Time (5 Questions)
        {
            id: 1,
            section: "Orientation to Time",
            question: "What year is it right now?",
            image: "/images/hourglass.jpg",
            options: dyn.year.options,
            correctAnswer: dyn.year.correctAnswer,
            score: 1
        },
        {
            id: 2,
            section: "Orientation to Time",
            question: "What season is it currently?",
            image: "/images/nature.jpg",
            options: dyn.season.options,
            correctAnswer: dyn.season.correctAnswer,
            score: 1
        },
        {
            id: 3,
            section: "Orientation to Time",
            question: "What month is it right now?",
            image: React.createElement(CalendarVisual),
            options: dyn.month.options,
            correctAnswer: dyn.month.correctAnswer,
            score: 1
        },
        {
            id: 4,
            section: "Orientation to Time",
            question: "What day of the week is today?",
            options: dyn.day.options,
            correctAnswer: dyn.day.correctAnswer,
            score: 1
        },
        {
            id: 5,
            section: "Orientation to Time",
            question: "What is today's date?",
            options: dyn.date.options,
            correctAnswer: dyn.date.correctAnswer,
            score: 1
        },

        // 2️⃣ Orientation to Place (5 Questions)
        {
            id: 6,
            section: "Orientation to Place",
            question: "What country are you currently in?",
            image: "/images/world_map.jpg",
            options: ["India", "USA", "UK", "Canada"],
            correctAnswer: "India",
            score: 1
        },
        {
            id: 7,
            section: "Orientation to Place",
            question: "What state are you currently in?",
            options: ["Maharashtra", "Gujarat", "Karnataka", "Delhi"],
            correctAnswer: "Maharashtra",
            score: 1
        },
        {
            id: 8,
            section: "Orientation to Place",
            question: "In what city are you currently?",
            options: ["Mumbai", "Pune", "Nashik", "Thane"],
            correctAnswer: "Mumbai",
            score: 1
        },
        {
            id: 9,
            section: "Orientation to Place",
            question: "In which district or county are we currently located?",
            image: "/images/cityscape.jpg",
            options: ["Mumbai Suburban", "Pune", "Thane", "Nashik"],
            correctAnswer: "Mumbai Suburban",
            score: 1
        },
        {
            id: 10,
            section: "Orientation to Place",
            question: "Please confirm your full name for identity orientation.",
            image: "/images/profile.jpg",
            options: dyn.identity.options,
            correctAnswer: dyn.identity.correctAnswer,
            score: 1,
            isDynamic: true
        },

        // 3️⃣ Registration (Immediate Memory) (3 Questions)
        {
            id: 11,
            section: "Registration",
            question: "Which word was identifying a fruit in the list provided (Apple, Table, Car)?",
            image: "/images/apple.jpg",
            options: ["Apple", "Banana", "Orange", "Mango"],
            correctAnswer: "Apple",
            score: 1
        },
        {
            id: 12,
            section: "Registration",
            question: "Which object identifying furniture was in the list?",
            image: "/images/table.jpg",
            options: ["Table", "Chair", "Desk", "Cupboard"],
            correctAnswer: "Table",
            score: 1
        },
        {
            id: 13,
            section: "Registration",
            question: "Which vehicle was identified in the list?",
            image: "/images/car.jpg",
            options: ["Car", "Bus", "Train", "Bicycle"],
            correctAnswer: "Car",
            score: 1
        },

        // 4️⃣ Attention & Calculation (5 Questions)
        {
            id: 14,
            section: "Attention & Calculation",
            question: "What is 100 − 7?",
            image: "/images/math.jpg",
            options: ["93", "94", "92", "91"],
            correctAnswer: "93",
            score: 1
        },
        {
            id: 15,
            section: "Attention & Calculation",
            question: "Continuing subtraction: What is 93 − 7?",
            options: ["86", "85", "87", "84"],
            correctAnswer: "86",
            score: 1
        },
        {
            id: 16,
            section: "Attention & Calculation",
            question: "Continuing subtraction: What is 86 − 7?",
            options: ["79", "78", "80", "77"],
            correctAnswer: "79",
            score: 1
        },
        {
            id: 17,
            section: "Attention & Calculation",
            question: "Continuing subtraction: What is 79 − 7?",
            options: ["72", "71", "73", "74"],
            correctAnswer: "72",
            score: 1
        },
        {
            id: 18,
            section: "Attention & Calculation",
            question: "Spell the word 'WORLD' backwards.",
            image: "/images/world.jpg",
            options: ["DLROW", "DLRWO", "DOWRL", "DRLOW"],
            correctAnswer: "DLROW",
            score: 1
        },

        // 5️⃣ Recall (Delayed Memory) (3 Questions)
        {
            id: 19,
            section: "Recall",
            question: "Recall the fruit from the earlier list.",
            image: "/images/apple.jpg",
            options: ["Apple", "Banana", "Mango", "Orange"],
            correctAnswer: "Apple",
            score: 1
        },
        {
            id: 20,
            section: "Recall",
            question: "Recall the furniture item from the earlier list.",
            options: ["Table", "Chair", "Sofa", "Desk"],
            correctAnswer: "Table",
            score: 1
        },
        {
            id: 21,
            section: "Recall",
            question: "Recall the vehicle from the earlier list.",
            options: ["Car", "Bus", "Train", "Bicycle"],
            correctAnswer: "Car",
            score: 1
        },

        // 6️⃣ Language Skills (6 Questions)
        {
            id: 22,
            section: "Language",
            question: "Identify the object shown in the image primarily used to cut paper.",
            image: "/images/scissors.png",
            options: ["Knife", "Scissors", "Spoon", "Pen"],
            correctAnswer: "Scissors",
            score: 1
        },
        {
            id: 23,
            section: "Language",
            question: "Which of these words is a verb?",
            image: "/images/running.jpg",
            options: ["Run", "Table", "Chair", "Pen"],
            correctAnswer: "Run",
            score: 1
        },
        {
            id: 24,
            section: "Language",
            question: "Choose the grammatically correct sentence.",
            options: ["She go to school", "She goes to school", "She going school", "She gone school"],
            correctAnswer: "She goes to school",
            score: 1
        },
        {
            id: 25,
            section: "Language",
            question: "What does the phrase 'Close the door' instruct you to do?",
            image: "/images/door.jpg",
            options: ["Open door", "Shut door", "Break door", "Lock door"],
            correctAnswer: "Shut door",
            score: 1
        },
        {
            id: 26,
            section: "Language",
            question: "Identify the object in the image primarily used for writing.",
            image: "/images/pen.jpg",
            options: ["Pen", "Plate", "Glass", "Spoon"],
            correctAnswer: "Pen",
            score: 1
        },
        {
            id: 27,
            section: "Language",
            question: "Which of the following colors is shown in the image?",
            image: "/images/blue.jpg",
            options: ["Blue", "Yellow", "Green", "Red"],
            correctAnswer: "Blue",
            score: 1
        },

        // 7️⃣ Visuospatial Ability (3 Questions)
        {
            id: 28,
            section: "Visuospatial",
            question: "Which shape shown in the clinical reference has four equal sides?",
            image: "/images/square.jpg",
            options: ["Triangle", "Square", "Circle", "Pentagon"],
            correctAnswer: "Square",
            score: 1
        },
        {
            id: 29,
            section: "Visuospatial",
            question: "Which geometric shape looks like a globe as shown?",
            image: "/images/world.jpg",
            options: ["Square", "Circle", "Triangle", "Rectangle"],
            correctAnswer: "Circle",
            score: 1
        },
        {
            id: 30,
            section: "Visuospatial",
            question: "Observe the pattern of two overlapping shapes. Which description is most accurate?",
            image: React.createElement(OverlappingPentagons),
            options: ["Two squares", "Two overlapping pentagons", "A circle inside a box", "Two separate triangles"],
            correctAnswer: "Two overlapping pentagons",
            score: 1
        }
    ];
}

// ─── MoCA Diagnostic Questions ───────────────────────────────────────────────
export function getMoCAQuestions(date = new Date()) {
    const dyn = getDynamicOrientationData(date);

    return [
        // 1️⃣ Visuospatial / Executive (5 Questions)
        {
            id: 1,
            section: "Visuospatial / Executive",
            question: "In a 3D cube drawing, evaluate the number of visible faces from this perspective.",
            image: "/cube.png",
            options: ["1", "2", "3", "4"],
            correctAnswer: "3",
            score: 1
        },
        {
            id: 2,
            section: "Visuospatial / Executive",
            question: "Which of the following geometric shapes is shown in high-contrast in the image?",
            image: "/red_circle.png",
            options: ["Triangle", "Square", "Circle", "Oval"],
            correctAnswer: "Circle",
            score: 1
        },
        {
            id: 3,
            section: "Visuospatial / Executive",
            question: "Evaluate the time shown on this clock.",
            image: "/clock.png",
            options: ["11:00", "10:11", "12:10", "11:10"],
            correctAnswer: "11:00",
            score: 1
        },
        {
            id: 4,
            section: "Visuospatial / Executive",
            question: "What color is shown in the clinical image above?",
            image: "/images/red.jpg",
            options: ["Red", "Blue", "Green", "Yellow"],
            correctAnswer: "Red",
            score: 1
        },
        {
            id: 5,
            section: "Visuospatial / Executive",
            question: "What digit do you see in the clinical image above?",
            image: "/digit4.png",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4",
            score: 1
        },

        // 2️⃣ Naming (3 Questions)
        {
            id: 6,
            section: "Naming",
            question: "Identify the animal in the clinical image.",
            image: "/images/lion.jpg",
            options: ["Lion", "Tiger", "Leopard", "Wolf"],
            correctAnswer: "Lion",
            score: 1
        },
        {
            id: 7,
            section: "Naming",
            question: "Identify the animal with the horn as shown.",
            image: "/animal_horn.png",
            options: ["Rhino", "Elephant", "Cow", "Buffalo"],
            correctAnswer: "Buffalo",
            score: 1
        },
        {
            id: 8,
            section: "Naming",
            question: "Identify the clinical image of the desert animal.",
            image: "/camel.png",
            options: ["Camel", "Horse", "Donkey", "Goat"],
            correctAnswer: "Camel",
            score: 1
        },

        // 3️⃣ Memory (Immediate Recall) (5 Questions)
        {
            id: 9,
            section: "Memory (Immediate)",
            question: "Recall: Which word appeared first in the list 'Face – Velvet – Church – Daisy – Red'?",
            image: "/images/face.jpg",
            options: ["Face", "Chair", "Table", "Bottle"],
            correctAnswer: "Face",
            score: 1
        },
        { id: 10, section: "Memory (Immediate)", question: "Which fabric-related word appeared in the list?", options: ["Velvet", "Silk", "Cotton", "Wool"], correctAnswer: "Velvet", score: 1 },
        { id: 11, section: "Memory (Immediate)", question: "Which place of worship appeared in the list?", options: ["Church", "Temple", "Mosque", "Library"], correctAnswer: "Church", score: 1 },
        { id: 12, section: "Memory (Immediate)", question: "Which flower appeared in the list?", options: ["Daisy", "Rose", "Lily", "Sunflower"], correctAnswer: "Daisy", score: 1 },
        { id: 13, section: "Memory (Immediate)", question: "Which color was mentioned in the list?", options: ["Red", "Blue", "Green", "Yellow"], correctAnswer: "Red", score: 1 },

        // 4️⃣ Attention (6 Questions)
        { id: 14, section: "Attention", question: "What is 20 + 5?", options: ["25", "24", "23", "26"], correctAnswer: "25", score: 1 },
        { id: 15, section: "Attention", question: "What is 30 − 4?", options: ["26", "27", "25", "28"], correctAnswer: "26", score: 1 },
        { id: 16, section: "Attention", question: "Which number comes next in the sequence: 2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], correctAnswer: "10", score: 1 },
        { id: 17, section: "Attention", question: "Which of these numbers is the largest?", options: ["12", "17", "15", "14"], correctAnswer: "17", score: 1 },
        { id: 18, section: "Attention", question: "What is 15 + 3?", options: ["18", "17", "16", "19"], correctAnswer: "18", score: 1 },
        { id: 19, section: "Attention", question: "How many letters are there in the word 'APPLE'?", options: ["4", "5", "6", "7"], correctAnswer: "5", score: 1 },

        // 5️⃣ Language (3 Questions)
        { id: 20, section: "Language", question: "Which sentence is grammatically correct?", options: ["She go to school", "She goes to school", "She going school", "She gone school"], correctAnswer: "She goes to school", score: 1 },
        { id: 21, section: "Language", question: "Which word means the opposite of 'cold'?", options: ["Hot", "Warm", "Cool", "Freeze"], correctAnswer: "Hot", score: 1 },
        { id: 22, section: "Language", question: "Which word in the following list is a verb?", options: ["Run", "Table", "Chair", "Door"], correctAnswer: "Run", score: 1 },

        // 6️⃣ Abstraction (2 Questions)
        { id: 23, section: "Abstraction", question: "What is the primary similarity between a train and a bicycle?", options: ["Both are transport", "Both are animals", "Both are buildings", "Both are foods"], correctAnswer: "Both are transport", score: 1 },
        { id: 24, section: "Abstraction", question: "What is the similarity between a watch and a clock?", options: ["Both show time", "Both are food", "Both are animals", "Both are vehicles"], correctAnswer: "Both show time", score: 1 },

        // 7️⃣ Delayed Recall (5 Questions)
        { id: 25, section: "Delayed Recall", question: "Recall: Which word appeared earlier in the memory list?", options: ["Face", "Bottle", "Chair", "Door"], correctAnswer: "Face", score: 1 },
        { id: 26, section: "Delayed Recall", question: "Recall: Which word related to fabric appeared earlier?", options: ["Velvet", "Cotton", "Silk", "Fabric"], correctAnswer: "Velvet", score: 1 },
        { id: 27, section: "Delayed Recall", question: "Recall: Which place of worship appeared earlier?", options: ["Church", "School", "Mall", "Bank"], correctAnswer: "Church", score: 1 },
        { id: 28, section: "Delayed Recall", question: "Recall: Which flower appeared earlier?", options: ["Daisy", "Rose", "Lily", "Tulip"], correctAnswer: "Daisy", score: 1 },
        { id: 29, section: "Delayed Recall", question: "Recall: Which color appeared earlier?", options: ["Red", "Blue", "Green", "Yellow"], correctAnswer: "Red", score: 1 },

        // 8️⃣ Orientation (1 Question)
        { id: 30, section: "Orientation", question: "What year is it currently?", options: dyn.year.options, correctAnswer: dyn.year.correctAnswer, score: 1 }
    ];
}

// Default dynamic questions instances
export const mmseQuestions = getMMSEQuestions();
export const mocaQuestions = getMoCAQuestions();

// Helper Functions
export function calculateScore(answers, questions) {
    let totalScore = 0;
    questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) {
            totalScore += q.score;
        }
    });
    return totalScore;
}

export function interpretMMSE(score) {
    if (score >= 24) return { level: "Normal", interpretation: "Normal cognitive function", color: "#6FCF97" }; // Green
    if (score >= 18) return { level: "Mild", interpretation: "Mild cognitive impairment", color: "#F59E0B" }; // Orange/Amber
    return { level: "Severe", interpretation: "Severe impairment", color: "#EF4444" }; // Red
}

export function interpretMOCA(score) {
    if (score >= 26) return { level: "Normal", interpretation: "Normal cognitive function", color: "#6FCF97" };
    if (score >= 18) return { level: "Mild", interpretation: "Mild cognitive impairment", color: "#F59E0B" };
    return { level: "Severe", interpretation: "Possible dementia risk", color: "#EF4444" };
}
