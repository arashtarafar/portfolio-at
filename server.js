const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const port = 8080;

// initialize the sqlite3 middleware and create a new database for the website
const sqlite3 = require("sqlite3");
const connectSqlite3 = require("connect-sqlite3");
const db = new sqlite3.Database("portfolio-at.db");

//////////////////////////////////////////////////////////////////// DATABASE STUFF

//////////////////////////////////////////////// USERS TABLE
db.run("CREATE TABLE users (userID INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, displayName TEXT NOT NULL, canEdit TEXT)", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table users created!")
        const users = [
            { 
                "username":"arashtarafar",
                "password":"$2b$12$yEXI.hG2rfDseTAawMuc8OGybTPfwLhFqFcrUNl3OnFjop/n7x.Vi", // ^r^shn3V3rL0s3s
                "display":"Arash", 
                "edit":"true"
            },
            { 
                "username":"jerland",
                "password":"$2b$12$REq/C7WMnbBcUigKA8iKmO6YvvdXSvbg/VXPK0JASAtb6rB6Id2iu", // jerome1234
                "display":"Jérôme",
                "edit":"true"
            },
        ]
        // inserts users
        users.forEach( (oneUser) => {
            db.run("INSERT INTO users (username, password, displayName, canEdit) VALUES (?, ?, ?, ?)", [oneUser.username, oneUser.password, oneUser.display, oneUser.edit], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the users table!");
                }
            });
        });
    }
});

//////////////////////////////////////////////// ORGANIZATIONS TABLE
db.run("CREATE TABLE organizations (organizationID INTEGER PRIMARY KEY, organizationName TEXT NOT NULL, isEducational TEXT NOT NULL)", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table organizations created!")
        const organizations = [
            { 
                "id":"1",
                "name":"Amirkabir University of Technology", 
                "educational":"true",
            },
            {   
                "id":"2",
                "name":"Jönköping University Public Speaking", 
                "educational":"",
            },
            {   
                "id":"3",
                "name":"Jönköping University", 
                "educational":"true",
            },
            {   
                "id":"4",
                "name":"Zeytoon", 
                "educational":"",
            },
            {   
                "id":"5",
                "name":"Snartup", 
                "educational":"",
            },
        ]
        // inserts organizations
        organizations.forEach( (oneOrganization) => {
            db.run("INSERT INTO organizations (organizationID, organizationName, isEducational) VALUES (?, ?, ?)", [oneOrganization.id, oneOrganization.name, oneOrganization.educational], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the organizations table!");
                }
            });
        });
    }
});


//////////////////////////////////////////////// EXPERIENCES TABLE
db.run("CREATE TABLE experiences (experienceID INTEGER PRIMARY KEY, experienceTitle TEXT NOT NULL, experienceDate TEXT NOT NULL, experienceDescription TEXT NOT NULL, organizationID INTEGER NOT NULL, FOREIGN KEY (organizationID) REFERENCES organizations(organizationID))", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table experiences created!")
        const experiences = [
            { 
                "title":"Graphic Designer",
                "date":"June 2023 - Current",
                "description":"In this position, I create visual elements, social media posts, and other promotional content for our association. My tasks include creating the logo and visual identity, promotional posts for platforms like Instagram and Facebook, and even website graphics and photography. I use an array of software like Adobe InDesign, Illustrator, Photoshop, and Lightroom to achieve my results in this role.",
                "orgID":"2",
            },
            { 
                "title":"Board member",
                "date":"June 2023 - Current",
                "description":"In this position, I help students get better at talking to people, especially large audiences. Here we teach people important communication skills, and as a result, improve our own communication and social capacity daily.",
                "orgID":"2",
            },
            { 
                "title":"Programming Teaching Assistant",
                "date":"June 2014",
                "description":"",
                "orgID":"1",
            },
            { 
                "title":"English Teaching Assistant",
                "date":"June 2016",
                "description":"1",
                "orgID":"",
            },
            { 
                "title":"Media Developer",
                "date":"September 2023",
                "description":"",
                "orgID":"5",
            },
            { 
                "title":"Writer",
                "date":"July 2015",
                "description":"",
                "orgID":"4",
            },
        ]
        // inserts experiences
        experiences.forEach( (oneExperience) => {
            db.run("INSERT INTO experiences (experienceTitle, experienceDate, experienceDescription, organizationID) VALUES (?, ?, ?, ?)", [oneExperience.title, oneExperience.date, oneExperience.description, oneExperience.orgID], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the experiences table!");
                }
            });
        });
    }
});


//////////////////////////////////////////////// EDUCATION TABLE
db.run("CREATE TABLE educations (educationID INTEGER PRIMARY KEY, educationDegree TEXT NOT NULL, educationDate TEXT NOT NULL, educationDescription TEXT NOT NULL, organizationID INTEGER NOT NULL, FOREIGN KEY (organizationID) REFERENCES organizations(organizationID))", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table educations created!")
        const educations = [
            { 
                "degree":"Bachelor of Applied Science in Graphic Design and Web Development",
                "date":"June 2025 (Current Student)",
                "description":"During my studies, I am learning a great deal about graphic design, UI/UX, and communication.",
                "orgID":"3",
            },
            { 
                "degree":"Bachelor of Applied Science in Computer Engineering",
                "date":"June 2017",
                "description":"Here, I learned most of what I know about computers, programming, and logical thinking.",
                "orgID":"1",
            },
        ]
        // inserts educations
        educations.forEach( (oneEducation) => {
            db.run("INSERT INTO educations (educationDegree, educationDate, educationDescription, organizationID) VALUES (?, ?, ?, ?)", [oneEducation.degree, oneEducation.date, oneEducation.description, oneEducation.orgID], (error) => {
                if (error) {
                    console.log("ERROR: ", error);
                } else {
                    console.log("Line added into the educations table!");
                }
            });
        });
    }
});


//////////////////////////////////////////////// PROJECTS TABLE
db.run("CREATE TABLE projects (projectID INTEGER PRIMARY KEY, projectName TEXT NOT NULL, projectCategory TEXT NOT NULL, projectDescription TEXT NOT NULL, projectThumbnail TEXT NOT NULL, projectURL TEXT)", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
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


//////////////////////////////////////////////// SKILLS TABLE
db.run("CREATE TABLE skills (skillID INTEGER PRIMARY KEY, skillName TEXT NOT NULL, isProfessional TEXT NOT NULL, skillDetails TEXT)", (error) => {
    if (error) {
        // tests error: display error
        // console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table skills created!")
        const skills = [
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
        // inserts skills
        skills.forEach( (oneSkill) => {
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

//////////////////////////////////////////////////////////////////// DATABASE STUFF

// initialize handlebars middleware and set the views directory
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// set the public directory for fixed assets
app.use(express.static("public"));

// use bodyParser middleware to read data from POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize the session database middleware
const SQLiteStore = connectSqlite3(session);

// create the session database and define the session
app.use(session({
    store: new SQLiteStore({db: "session-db.db"}),
    "saveUninitialized": false,
    "resave": false,
    "secret": "This123Is@Another#456GreatSecret678%Sentence"
}));

// Routing

//////////////////////////////////////////////////////////////////// ABOUT PAGE
app.get("/", (req, res)=>{
    // console.log("SESSION: ", req.session);

    const model = {
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        canEdit: req.session.canEdit,
    }
    res.render("about", model);
});

//////////////////////////////////////////////////////////////////// EDUCATION PAGE
app.get("/education", (req, res)=>{
    // console.log("SESSION: ", req.session);

    db.all("SELECT * FROM organizations JOIN educations ON organizations.organizationID=educations.organizationID", (error, educationData) => {
        if(error){
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: true,
                theError: error,
                educations: []
            }
            res.render("education", model);
        } else{
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: false,
                theError: "",
                educations: educationData
            }
            res.render("education", model);
        }
    });
});
app.get("/education/delete/:id", (req, res)=>{
    const id = req.params.id;
    if(req.session.isLoggedIn == true && req.session.isAdmin == true){
        db.all("DELETE FROM educations WHERE educationID=?;", [id], (error, educationData)=>{
            if(error){
                const model = {
                    dbError: true,
                    theError: error,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                }
                res.redirect("/education");
            }else{
                const model = {
                    dbError: false,
                    theError: "",
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                }
                res.redirect("/education");
            }
        });
    }else{
        res.redirect("/login");
    }
});

//////////////////////////////////////////////////////////////////// EXPERIENCE PAGE
app.get("/experience", (req, res)=>{
    // console.log("SESSION: ", req.session);
    
    db.all("SELECT * FROM organizations JOIN experiences ON organizations.organizationID=experiences.organizationID", (error, experienceData) => {
        if(error){
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: true,
                theError: error,
                experiences: []
            }
            res.render("experience", model);
        } else{
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: false,
                theError: "",
                experiences: experienceData
            }
            res.render("experience", model);
        }
    });
});
app.get("/experience/delete/:id", (req, res)=>{
    const id = req.params.id;
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("DELETE FROM experiences WHERE experienceID=?;", [id], (error, experienceData)=>{
            if(error){
                const model = {
                    dbError: true,
                    theError: error,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    experiences: experienceData
                }
                res.redirect("/experience");
            }else{
                const model = {
                    dbError: false,
                    theError: "",
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    experiences: experienceData
                }
                res.redirect("/experience");
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.get("/experience/create", (req, res)=>{
    // console.log("SESSION: ", req.session);
    
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("SELECT * FROM organizations", (error, organizationData) => {
            if(error){
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: true,
                    theError: error,
                    organizations: []
                }
                res.render("experience/create", model);
            } else{
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: false,
                    theError: "",
                    organizations: organizationData
                }
                res.render("experience/create", model);
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.post("/experience/create", (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const newExperience = [
            req.body.experienceTitle,
            req.body.experienceDate,
            req.body.experienceDescription,
            req.body.organization
        ];
        db.run("INSERT INTO experiences (experienceTitle, experienceDate, experienceDescription, organizationID) VALUES (?, ?, ?, ?);", newExperience, (error) => {
            if (error) {
                console.log("ERROR: ", error);
            } else {
                console.log("New experience added!");
            }
            res.redirect("/experience");
        });
    }else{
        res.redirect("/login");
    }
});
app.get("/experience/update/:id", (req, res)=>{
    // console.log("SESSION: ", req.session);
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("SELECT * FROM organizations JOIN experiences ON organizations.organizationID=experiences.organizationID WHERE experienceID=?;", [req.params.id], (error, experienceData) => {
            if(error){
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: true,
                    theError: error,
                    experience: []
                }
                res.render("experience/update", model);
            } else{
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: false,
                    theError: "",
                    experience: experienceData
                }
                res.render("experience/update", model);
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.post("/experience/update/:id", (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const experienceDataBundle = [
            req.body.experienceTitle,
            req.body.experienceDate,
            req.body.experienceDescription,
            req.body.organization,
            req.params.id
        ];
        db.run("UPDATE experiences SET experienceTitle=?, experienceDate=?, experienceDescription=?, organizationID=? WHERE experienceID=?;", experienceDataBundle, (error) => {
            if (error) {
                console.log("ERROR: ", error);
            } else {
                console.log("Experience modified!");
            }
            res.redirect("/experience");
        });
    }else{
        res.redirect("/login");
    }
});

//////////////////////////////////////////////////////////////////// PROJECTS PAGE
app.get("/projects", (req, res)=>{
    // console.log("SESSION: ", req.session);

    db.all("SELECT * FROM projects", (error, projectsData) => {
        if(error){
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: true,
                theError: error,
                projects: []
            }
            res.render("projects", model);
        } else{
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: false,
                theError: "",
                projects: projectsData
            }
            res.render("projects", model);
        }
    });
});
app.get("/projects/delete/:id", (req, res)=>{
    const id = req.params.id;
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("DELETE FROM projects WHERE projectID=?;", [id], (error, projectData)=>{
            if(error){
                const model = {
                    dbError: true,
                    theError: error,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.redirect("/projects");
            }else{
                const model = {
                    dbError: false,
                    theError: "",
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.redirect("/projects");
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.get("/projects/create", (req, res)=>{
    // console.log("SESSION: ", req.session);

    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const model = {
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin
        }
        res.render("projects/create", model);
    }else{
        res.redirect("/login");
    }
});
app.post("/projects/create", (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const newProject = [
            req.body.projectName,
            req.body.projectCategory,
            req.body.projectDescription,
            req.body.projectThumbnail,
            req.body.projectURL
        ];
        db.run("INSERT INTO projects (projectName, projectCategory, projectDescription, projectThumbnail, projectURL) VALUES (?, ?, ?, ?, ?);", newProject, (error) => {
            if (error) {
                console.log("ERROR: ", error);
            } else {
                console.log("New project added!");
            }
            res.redirect("/projects");
        });
    }else{
        res.redirect("/login");
    }
});
app.get("/projects/update/:id", (req, res)=>{
    // console.log("SESSION: ", req.session);
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("SELECT * FROM projects WHERE projectID=?;", [req.params.id], (error, projectData) => {
            if(error){
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: true,
                    theError: error,
                    project: []
                }
                res.render("projects/update", model);
            } else{
                const model = {
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin,
                    canEdit: req.session.canEdit,
                    hasDatabaseError: false,
                    theError: "",
                    project: projectData
                }
                res.render("projects/update", model);
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.post("/projects/update/:id", (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const projectDataBundle = [
            req.body.projectName,
            req.body.projectDescription,
            req.body.projectThumbnail,
            req.body.projectURL,
            req.params.id
        ];
        db.run("UPDATE projects SET projectName=?, projectDescription=?, projectThumbnail=?, projectURL=? WHERE projectID=?;", projectDataBundle, (error) => {
            if (error) {
                console.log("ERROR: ", error);
            } else {
                console.log("Project modified!");
            }
            res.redirect("/projects");
        });
    }else{
        res.redirect("/login");
    }
});

//////////////////////////////////////////////////////////////////// SKILLS PAGE
app.get("/skills", (req, res)=>{
    // console.log("SESSION: ", req.session);

    db.all("SELECT * FROM skills", (error, skillsData) => {
        if(error){
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: true,
                theError: error,
                skills: []
            }
            res.render("skills", model);
        } else{
            const model = {
                isLoggedIn: req.session.isLoggedIn,
                name: req.session.name,
                isAdmin: req.session.isAdmin,
                canEdit: req.session.canEdit,
                hasDatabaseError: false,
                theError: "",
                skills: skillsData
            }
            res.render("skills", model);
        }
    });
});
app.get("/skills/delete/:id", (req, res)=>{
    const id = req.params.id;
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        db.all("DELETE FROM skills WHERE skillID=?;", [id], (error, skillsData)=>{
            if(error){
                const model = {
                    dbError: true,
                    theError: error,
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.redirect("/skills");
            }else{
                const model = {
                    dbError: false,
                    theError: "",
                    isLoggedIn: req.session.isLoggedIn,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                }
                res.redirect("/skills");
            }
        });
    }else{
        res.redirect("/login");
    }
});
app.get("/skills/create", (req, res)=>{
    // console.log("SESSION: ", req.session);
    
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const model = {
            isLoggedIn: req.session.isLoggedIn,
            name: req.session.name,
            isAdmin: req.session.isAdmin
        }
        res.render("skills/create", model);
    }else{
        res.redirect("/login");
    }
});
app.post("/skills/create", (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.canEdit == "true"){
        const skillName = req.body.skillName;
        let isProfessional = "";
        let skillDetails = "";
        switch(req.body.skillCategory){
            case "hard":
                isProfessional = "yes";
                break;
            case "soft":
                break;
            case "lang":
                skillDetails = req.body.skillDetails;
                break;
            default:
                break;
        }
        db.run("INSERT INTO skills (skillName, isProfessional, skillDetails) VALUES (?, ?, ?);", [skillName, isProfessional, skillDetails], (error) => {
            if (error) {
                console.log("ERROR: ", error);
            } else {
                console.log("New skill added!");
            }
            res.redirect("/skills");
        });
    }else{
        res.redirect("/login");
    }
});

//////////////////////////////////////////////////////////////////// LOGIN PAGES
app.get("/login", (req, res)=>{
    res.render("login");
});
app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // const saltRounds = 12;

    // console.log(`User data received => username: ${username} password: ${password}`);
    
    // bcrypt.hash(password, saltRounds, (err, hash)=>{
    //     console.log(`Hashed "${password}" with bcrypt is: ${hash}`);
    // });

    // Check whether correct username and password for admin is entered
    // username: admin
    // password: ^r^shs0M3t1m3sL0s3s
    if(username == "admin"){
        bcrypt.compare(password, "$2b$12$UGk4j/8GnyTZy0GFaxghaOJlxxUCeQ6CM9fkA3HlofTtN4dDGwoSC", (error, result)=>{
            if(error){
                console.log("Error in comparing encryption: ", error);
            }else if(result == true){
                console.log("comparison with admin password returned true");
                console.log("Administrator is logged in!");
                req.session.isLoggedIn = true;
                req.session.isAdmin = true;
                req.session.canEdit = "true";
                req.session.name = "Admin";
                res.redirect("/");
            }else{
                console.log("Incorrect username and/or password");
                req.session.isLoggedIn = false;
                req.session.isAdmin = false;
                req.session.canEdit = "";
                req.session.name = "";
                res.redirect("/login");
            }
        });
    } else{
        db.all("SELECT * FROM users WHERE username=?;", [username], (error, userData) => {
            if(error){
                console.log("Error when reading user from database: ", error);
                res.redirect("/login");
            } else{
                if(userData.length > 0){
                    bcrypt.compare(password, userData[0].password, (error, result)=>{
                        if(error){
                            console.log("Error in comparing encryption: ", error);
                        }else if(result == true){
                            console.log(`${userData[0].displayName} is logged in!`);
                            req.session.isLoggedIn = true;
                            req.session.isAdmin = false;
                            req.session.canEdit = userData[0].canEdit;
                            req.session.name = userData[0].displayName;
                            res.redirect("/");
                        }else{
                            console.log("Incorrect username and/or password");
                            req.session.isLoggedIn = false;
                            req.session.isAdmin = false;
                            req.session.canEdit = "";
                            req.session.name = "";
                            res.redirect("/login");
                        }
                    });
                }else{
                    console.log("Incorrect username and/or password");
                    req.session.isAdmin = false;
                    req.session.isLoggedIn = false;
                    req.session.name = "";
                    res.redirect("/login");
                }
            }
        });
    }
});
app.get("/logout", (req, res)=>{
    console.log("Successfully logged out of " + req.session.name + ".");

    req.session.isAdmin = false;
    req.session.canEdit = "";
    req.session.isLoggedIn = false;
    req.session.name = "";
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});