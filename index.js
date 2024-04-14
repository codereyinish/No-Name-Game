const MainDiv = document.querySelector("#mainDiv");
const AskButton = document.querySelector("#AskBtn");
const body = document.querySelector("body");
const score = document.querySelector("#score");
let ScoreNum = 0;
score.textContent = ScoreNum;
var UnClickedArray = [];
var ClickedArray = [];
var UnClickedNumsArray = [];
var TextInsideAllSquaresArray = [];
var SureCollisionNumsArray = [24, 26, 28, 42 ,46, 48, 62, 64, 68, 82,84,86];

InitalGAMESetup();

function InitalGAMESetup()
{
    CreateSquares();
    FillUnClickedArray();
    FillUnClickedNumsArray();
    RetriveTextFromAllSquares();
}

function CreateSquares()
{
    for(i = 0; i<64; i++)
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

function RetriveTextFromAllSquares()
{
    UnClickedArray.forEach(element => {
        TextInsideAllSquaresArray.push((element.textContent));
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
        TextInsideAllSquaresArray = [];
        InitalGAMESetup();
        ScoreNum = 0;
        score.textContent = ScoreNum;
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

function ClickEventforMainDiv(event)
{
    let selectedDiv = event.target
    // console.log(selectedDiv);
    // console.log(UnClickedArray);
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
                    GameTriumphOrNot();
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
    const splicedDiv =   UnClickedArray.splice(index, 1);
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
    }  
 
}

function GameTriumphOrNot()
{
    if(ArraysEqualityCheck(SureCollisionNumsArray, UnClickedNumsArray)===true) //end the game 
        {
            alert("Level Completed");
            UncoverSureCollisionNums();
            AddPlayAgainBtn();
            FreezeClickonSquares();
        }
}


function ArraysEqualityCheck(arr1, arr2)
{
    // order(Index) doesnt matter for us
    if(arr1.length===arr2.length)
    {
        return arr1.every((value1 =>
            {
              return arr2.includes(value1);
        }))
    }
    else{
        return false;
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

function RemovePlayAgainBtn()
{
    document.getElementById("againId").remove();
}


