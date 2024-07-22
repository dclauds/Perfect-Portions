document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateMealPlan').addEventListener('click', generateMealPlan);
    document.getElementById('clearPlanner').addEventListener('click', clearPlanner);
});

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function generateMealPlan() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let goal = document.getElementById('goal').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let meals = {};

    days.forEach(day => {
        meals[day] = {
            breakfast: document.querySelector(`[name="${day.toLowerCase()}Breakfast"]`).value,
            snack1: document.querySelector(`[name="${day.toLowerCase()}Snack1"]`).value,
            lunch: document.querySelector(`[name="${day.toLowerCase()}Lunch"]`).value,
            snack2: document.querySelector(`[name="${day.toLowerCase()}Snack2"]`).value,
            dinner: document.querySelector(`[name="${day.toLowerCase()}Dinner"]`).value
        };
    });
    console.log(meals);

    let newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <head>
            <title>Your Meal Plan</title>
            <style>
                body {
                    font-family: monospace;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Weekly Meal Plan</h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Goal for the week: ${goal}</p>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Snack 1</th>
                        <th>Lunch</th>
                        <th>Snack 2</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    ${days.map(day => `
                        <tr>
                            <td>${day}</td>
                            <td>${meals[day].breakfast}</td>
                            <td>${meals[day].snack1}</td>
                            <td>${meals[day].lunch}</td>
                            <td>${meals[day].snack2}</td>
                            <td>${meals[day].dinner}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="window.print()">Print</button>
        </body>
        </html>
    `);
}

function clearPlanner() {
    document.getElementById('mealPlanForm').reset();
}
