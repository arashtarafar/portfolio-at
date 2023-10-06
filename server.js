const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 8080;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("portfolio-at.db");

//////////////////////////////////////////////// DATABASE STUFF

//////////////////////////////////////////////// PROJECTS TABLE
db.run("CREATE TABLE projects (projectID INTEGER PRIMARY KEY, projectName TEXT NOT NULL, projectCategory TEXT NOT NULL, projectDescription TEXT NOT NULL, projectThumbnail TEXT NOT NULL, projectURL TEXT)", (error) => {
    if (error) {
        // tests error: display error
        console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table projects created!")
        const projects = [
            { 
                "name":"Visual Identity Guidelines: Lush", 
                "category":"graphic", 
                "description": "In this course project, I made a visual identity guideline document for Lush, an imaginary beauty products company.",
                "thumbnail":"media/img/project-graphic-1.png",
                "url":"https://drive.google.com/file/d/1HSc1aVq66CP2O-rnDndd8XUr-xDYVkRF/view?usp=sharing"
            },
            { 
                "name":"Printed Magazine: Plants and Gardening", 
                "category":"graphic", 
                "description": "This collaborative course project, put my skills in creating layouts and graphics in Illustrator and InDesign, as well as photo editing in Lightroom, to the test.",
                "thumbnail":"media/img/project-graphic-2.png",
                "url":"https://drive.google.com/file/d/10018Q1Kq_sbB5-MQRdFVSJzbv_7rE6VA/view?usp=sharing"
            },
            { 
                "name":"Logo Concepts: JUPS", 
                "category":"graphic", 
                "description": "To start off my work in the Jönköping University public speaking association, I proposed logo concepts to the board. The final logo is going to represent the association in the real world, on our website, and in social media.",
                "thumbnail":"media/img/project-graphic-3.png",
                "url":""
            },
            { 
                "name":"Space Game: Javascript Game", 
                "category":"web", 
                "description": "A simple javascript space game with minimalistic design, similar to the famous Lunar Lander game.",
                "thumbnail":"media/img/project-web-1.png",
                "url":"https://ju-nmd2022.github.io/fop-lunar-lander-arashtarafar/"
            },
            { 
                "name":"No Monkey Business: Javascript Game", 
                "category":"web", 
                "description": "This game was designed to be simple, annoying, and addictive. A lesson in effectiveness learned from games like Flappy Bird and Skippy Squirrel.",
                "thumbnail":"media/img/project-web-2.png",
                "url":"https://ju-nmd2022.github.io/fop-final-project-project-34/"
            },
            { 
                "name":"The Wandering: Javascript Game", 
                "category":"web", 
                "description": "This RPG-style game has elements of lore that are reminiscent of the Dark Souls and Elden Ring universe.",
                "thumbnail":"media/img/project-web-3.png",
                "url":"https://ju-nmd2022.github.io/wuid-adventure-game-arashtarafar/"
            },
            { 
                "name":"Lifestyle Shoot: Fairwell Pubcrawl 2023", 
                "category":"photography", 
                "description": "Accompanying the groups in our university's fairwell pub event in the summer of 2023, I captured the memories and heat of the drinking and social games.",
                "thumbnail":"media/img/project-photography-1.png",
                "url":""
            },
            { 
                "name":"Portrait Shoot: Social Media", 
                "category":"photography", 
                "description": "This unpaid photography and editing job, put my skills to the test, and supplied my client with an array of photos to showcase on their instagram and Tinder accounts.",
                "thumbnail":"media/img/project-photography-2.png",
                "url":""
            },
        ]
        // inserts projects
        projects.forEach( (oneProject) => {
            db.run("INSERT INTO projects (projectName, projectCategory, projectDescription, projectThumbnail, projectURL) VALUES (?, ?, ?, ?, ?)", [oneProject.name, oneProject.category, oneProject.description, oneProject.thumbnail, oneProject.url], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the projects table!");
                }
            });
        });
    }
});
//////////////////////////////////////////////// PROJECTS TABLE

//////////////////////////////////////////////// SKILLS TABLE
db.run("CREATE TABLE skills (skillID INTEGER PRIMARY KEY, skillName TEXT NOT NULL, isProfessional TEXT NOT NULL, skillDetails TEXT)", (error) => {
    if (error) {
        // tests error: display error
        console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table skills created!")
        const projects = [
            { 
                "name":"Adobe Creative Suite", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"Microsoft Office Suite", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"Visual Studio Code", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"DaVinci Resolve", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"Figma", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"Git", 
                "professional":"yes", 
                "details": "",
            },
            { 
                "name":"Attention to Detail", 
                "professional":"", 
                "details": "",
            },
            { 
                "name":"Critical Thinking", 
                "professional":"", 
                "details": "",
            },
            { 
                "name":"Quick Learning and Adaptation", 
                "professional":"", 
                "details": "",
            },
            { 
                "name":"English", 
                "professional":"", 
                "details": "Professional/Native proficiency",
            },
            { 
                "name":"Swedish", 
                "professional":"", 
                "details": "Basic/Speaking proficiency",
            },
            { 
                "name":"Persian", 
                "professional":"", 
                "details": "Native Language",
            },
        ]
        // inserts projects
        projects.forEach( (oneSkill) => {
            db.run("INSERT INTO skills (skillName, isProfessional, skillDetails) VALUES (?, ?, ?)", [oneSkill.name, oneSkill.professional, oneSkill.details], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the skills table!");
                }
            });
        });
    }
});
//////////////////////////////////////////////// SKILLS TABLE

//////////////////////////////////////////////// DATABASE STUFF

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

// Routing
app.get("/", (req, res)=>{
    res.render("about");
});
app.get("/education", (req, res)=>{
    res.render("education");
});
app.get("/experience", (req, res)=>{
    res.render("experience");
});
app.get("/projects", (req, res)=>{
    db.all("SELECT * FROM projects", (error, projectsData) => {
        if(error){
            const model = {
                hasDatabaseError: true,
                theError: error,
                projects: []
            }
            res.render("projects", model);
        } else{
            const model = {
                hasDatabaseError: false,
                theError: "",
                projects: projectsData
            }
            res.render("projects", model);
        }
    });
});
app.get("/skills", (req, res)=>{
    db.all("SELECT * FROM skills", (error, skillsData) => {
        if(error){
            const model = {
                hasDatabaseError: true,
                theError: error,
                skills: []
            }
            res.render("skills", model);
        } else{
            const model = {
                hasDatabaseError: false,
                theError: "",
                skills: skillsData
            }
            res.render("skills", model);
        }
    });
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});