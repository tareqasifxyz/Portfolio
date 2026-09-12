import { Utils } from './Utils.js';
import projects from "./Database/projects.js";

async function ShowProjects()
{
    Utils.ClearGridCell("cell21");

    for (var i = 0; i < projects.length; i++)
    {
        var div2 = await Utils.GetDivFromHtmlFile(
            "./ProjectSummaryPanel.html",
            "ProjectSummaryPanel"
        );

        const projectIndex = i;

        Utils.Subscribe(
            div2,
            "Title",
            "click",
           async  function (event)
            {
                //alert(                    "Project index: " + projectIndex +                    "\nTitle: " + projects[projectIndex].title                );

                await ShowProjectDetails(projectIndex);


            }
        );

        Utils.AppendElementToGridCell(
            div2,
            "cell21"
        );
    }
}

async function ShowProjectDetails(project_index)
{
    Utils.ClearGridCell("cell21");

    var div2 = await Utils.GetDivFromHtmlFile(
        "./ProjectDetailsPanel.html",
        "ProjectDetailsPanel"
    );

    Utils.AppendElementToGridCell(div2, "cell21");

    //Fillup data based on project index

}

async function ShowCV()
{

    Utils.ClearGridCell("cell21");


    var div2 = await Utils.GetDivFromHtmlFile(
        "./CV/MSc_TUe_Panel.html",
        "MSc_TUe_Panel"
    );

    Utils.AppendElementToGridCell(
        div2,
        "cell21"
    );

    div2 = await Utils.GetDivFromHtmlFile(
        "./CV/Job_Stamford_Panel.html",
        "Job_Stamford_Panel"
    );

    Utils.AppendElementToGridCell(
        div2,
        "cell21"
    );

}



export async function Main()
{
    const div1 = await Utils.GetDivFromHtmlFile(
        "./MainForm.html",
        "MainForm"
    );
    document.body.appendChild(div1);

    const div = await Utils.GetDivFromHtmlFile(
        "./HeaderPanel.html",
        "HeaderPanel"
    );

    Utils.Subscribe(div, "CV", "click",

        async function (event)
        {
            await ShowCV();
        }
    );
    Utils.Subscribe(div, "Projects", "click",

        async function (event)
        {
            await ShowProjects();
        }
    );
    Utils.Subscribe(div, "Contact", "click",

        function (event)
        {
            alert("Message me through LinkedIn or send an email to tareqasifxyz@gmail.com");
        }
    );

    Utils.ClearGridCell("cell11");
    Utils.AppendElementToGridCell(div, "cell11");

    await ShowProjects();
}

Main();