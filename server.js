const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 8080;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("projects-at.db");

//////////////////////////////////////////////// DATABASE STUFF
// creates table projects at startup
db.run("CREATE TABLE projects (projectID INTEGER PRIMARY KEY, projectName TEXT NOT NULL, projectCategory TEXT NOT NULL, projectDescription TEXT NOT NULL, projectThumbnail TEXT NOT NULL, projectURL TEXT)", (error) => {
    if (error) {
        // tests error: display error
        console.log("ERROR: ", error);
    } else {
        // tests error: no error, the table has been created
        console.log("---> Table projects created!")
        const projects = [
            { 
                "id":"1", 
                "name":"Visual Identity Guidelines: Lush", 
                "category":"graphics", 
                "description": "In this course project, I made a visual identity guideline document for Lush, an imaginary beauty products company.",
                "thumbnail":"media/img/project-graphic-1.png",
                "url":"https://drive.google.com/file/d/1HSc1aVq66CP2O-rnDndd8XUr-xDYVkRF/view?usp=sharing"
            },
            
        ]
        // inserts projects
        projects.forEach( (oneProject) => {
            db.run("INSERT INTO projects (projectID, projectName, projectCategory, projectDescription, projectThumbnail, projectURL) VALUES (?, ?, ?, ?, ?, ?)", [oneProject.id, oneProject.name, oneProject.category, oneProject.description, oneProject.thumbnail, oneProject.url], (error) => {
                if (error) {
                    console.log("ERROR: ", error)
                } else {
                    console.log("Line added into the projects table!")
                }
            });
        });
    }
});
//////////////////////////////////////////////// DATABASE STUFF

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

// Routing
app.get("/", (req, res)=>{
    res.render("about.handlebars");
});
app.get("/education", (req, res)=>{
    res.render("education.handlebars");
});
app.get("/experience", (req, res)=>{
    res.render("experience.handlebars");
});
app.get("/projects", (req, res)=>{
    db.all("SELECT * FROM projects", (error, projectsData) => {
        if(error){
            const model = {
                hasDatabaseError: true,
                theError: error,
                projects: []
            }
            res.render("projects.handlebars", model);
        } else{
            const model = {
                hasDatabaseError: false,
                theError: "",
                projects: projectsData
            }
            res.render("projects.handlebars", model);
        }
    });
});
app.get("/skills", (req, res)=>{
    res.render("skills.handlebars");
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});