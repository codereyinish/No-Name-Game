const MainDiv = document.querySelector("#mainDiv");
const AskButton = document.querySelector("#AskBtn");
const body = document.querySelector("body");
const score = document.querySelector("#score");
const remaining = document.querySelector("#remaining");
let ScoreNum = 0;
score.textContent = ScoreNum;
let n = 64;
var UnClickedArray = [];
var ClickedArray = [];
var UnClickedNumsArray = [];
let SureCollisionNumsArray = [24, 26, 28, 42 ,46, 48, 62, 64, 68, 82,84,86];
let RemainingUnclicks = n - (SureCollisionNumsArray.length);// we cant use UnclickedNums here until squares are created
remaining.textContent = RemainingUnclicks;


InitalGAMESetup();

function InitalGAMESetup()
{
    CreateSquares();
    FillUnClickedArray();
    FillUnClickedNumsArray();
}

function CreateSquares()
{
    for(i = 0; i<n; i++)
    {
        const ChildDiv = document.createElement("div");
        ChildDiv.id = "divs" + (i+1);
        ChildDiv.textContent = i+i;
        ChildDiv.classList.add("ChildDiv");
        MainDiv.appendChild(ChildDiv);
    }
}

function FillUnClickedArray()
{
    UnClickedArray = ( Array.from(MainDiv.childNodes));
}
//this retuns a new array , Unclicked Array stores reference to brand new Array of 64 squares, we are not adding new values to  previous UnclickedArray data

function FillUnClickedNumsArray()
{
    UnClickedArray.forEach(element => {
        UnClickedNumsArray.push(Number(element.textContent));
    });
}


body.addEventListener("click", ClickEventforMainDiv);
body.addEventListener("click",  ClickEventForPlayAgainBtn);

function ClickEventForPlayAgainBtn(event)
{
    if(event.target.id === "againId")
    {
        DeleteAllSquares();
        UnClickedArray = [];
        UnClickedNumsArray = [];
        InitalGAMESetup();
        ScoreNum = 0;
        score.textContent = ScoreNum;
        RemainingUnclicks = n - (SureCollisionNumsArray.length);
        remaining.textContent = RemainingUnclicks;
        RemovePlayAgainBtn();
        body.addEventListener("click", ClickEventforMainDiv);
    } 
}

function DeleteAllSquares()
{
    while(MainDiv.hasChildNodes())
       {
            MainDiv.firstChild.remove();
        }
}

function RemovePlayAgainBtn()
{
    document.getElementById("againId").remove();
}


function ClickEventforMainDiv(event)
{
    let selectedDiv = event.target

    if(selectedDiv.parentNode.id ==="mainDiv")
    {
                if(UnClickedArray.includes(selectedDiv))
                {
                    let text = selectedDiv.textContent;
                    let ReversedText = reveseString(text);
                    event.target.textContent = ReversedText;
                    event.target.classList.add("ClickedChildDiv");
                    // add div to ClickedArray and Remove from Unclicked One
                    RemovefromUnclickedArray(selectedDiv);
                    RemovefromUnclickedNumsArray(text)
                    CheckForMatch(ReversedText,selectedDiv);
                    if(RemainingUnclicks===0)
                    {
                        alert("Level Completed");
                        UncoverSureCollisionNums();
                        AddPlayAgainBtn();
                        FreezeClickonSquares();
                    }
                }
            }
        
    }


function reveseString(str)
{
    let splittext = str.split("");
    let reversedArr = splittext.reverse();
    let joinArr = reversedArr.join("");
    return joinArr;
}

function  RemovefromUnclickedArray(SelectedDiv)
{
    const index = UnClickedArray.indexOf(SelectedDiv);
    UnClickedArray.splice(index, 1);
}

function RemovefromUnclickedNumsArray(TextBeforeReverse)
{
    
    let Num = Number(TextBeforeReverse)
    const index2 = UnClickedNumsArray.indexOf(Num);
    UnClickedNumsArray.splice(index2,1);
}

// Match Occurs if text Content equals
function CheckForMatch(ReversedText,selectedDiv)
{
    let ReversedNum = (Number(ReversedText,selectedDiv));
    let foundIndex = (UnClickedNumsArray.findIndex((num)=> num===ReversedNum));
    if(foundIndex!==-1)
        {
            alert("Game finished");
            AddBgColorToMatchedDivs(selectedDiv, foundIndex);
            AddPlayAgainBtn();
            FreezeClickonSquares();
        }
    else{
        ScoreNum++;
        score.textContent = ScoreNum;
        RemainingUnclicks--;
        remaining.textContent = RemainingUnclicks;

    }  
 
}


function UncoverSureCollisionNums()
{
    UnClickedArray.forEach((SureCollideDiv)=>
    {
        SureCollideDiv.classList.add("SureCollideDiv");
    })
}

function AddBgColorToMatchedDivs(selectedDiv, foundIndex)
{
    selectedDiv.classList.add("DeadSquare");
    UnClickedArray[foundIndex].classList.add("DeadSquare");
}


function AddPlayAgainBtn()
{
    const again = document.createElement("button");
    again.id = "againId";
    again.textContent = "Play Again"
    again.classList.add("PlayAgain");
    body.appendChild(again);
}

function FreezeClickonSquares()
{
    body.removeEventListener("click", ClickEventforMainDiv);
}



