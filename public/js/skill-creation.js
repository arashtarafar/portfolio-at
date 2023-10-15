const skillCategoryDropdown = document.getElementById("skillCategory");
const skillDetailsInput = document.getElementById("skillDetails");

skillCategoryDropdown.addEventListener("change", function(){
    skillDetailsInput.style.display = skillCategoryDropdown.value == "lang" ? "block" : "none";
});