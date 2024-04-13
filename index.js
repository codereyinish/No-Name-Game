
const MainDiv = document.querySelector("#mainDiv");
const AskButton = document.querySelector("#AskBtn");
const body = document.querySelector("body");
const score = document.querySelector("#score");
let ScoreNum = 0;
score.textContent = ScoreNum;
var UnClickedArray = [];
var ClickedArray = [];
var UnClickedNumsArray = [];


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
    FillUnClickedArray();
    console.log("A");
  console.log(UnClickedArray);
  FillUnClickedNumsArray();
  console.log("B");
  console.log(UnClickedNumsArray);
}

function FillUnClickedArray()
{
    UnClickedArray = ( Array.from(MainDiv.childNodes));
}


function FillUnClickedNumsArray()
{
    UnClickedArray.forEach(element => {
        UnClickedNumsArray.push(Number(element.textContent));
    });
}

CreateSquares();


body.addEventListener("click", ClickEventforMainDiv);
body.addEventListener("click",  ClickEventForPlayAgainBtn);

function ClickEventForPlayAgainBtn(event)
{
    if(event.target.id === "againId")
    {
    //    I can also Reset color and do FillUnclickedArray to minmize computinfg resources in Creating and Restyling all squares
    //    FillUnClickedArray();
        CreateSquares();
        ScoreNum = 0;
        score.textContent = ScoreNum;
       RemovePlayAgainBtn();

    } 
}

function ClickEventforMainDiv(event)
{
    let selectedDiv = event.target
    console.log(selectedDiv);
    console.log(UnClickedArray);
    if(selectedDiv.parentNode.id ==="mainDiv")
    {
        // restricition for Double Clicking(Reversing)
        if(UnClickedArray.includes(selectedDiv))
        {
            let text = selectedDiv.textContent;
            let ReversedText = reveseString(text);
            event.target.textContent = ReversedText;
            event.target.classList.add("ClickedChildDiv");
            // add div to ClickedArray and Remove from Unclicked One
            RemovefromUnclickedArray(selectedDiv);
            RemovefromUnclickedNumsArray(text);
            CheckForMatch(ReversedText,selectedDiv);
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
//   console.log(splicedDiv);
//   console.log(" UnclicedArray After");
//   console.log(UnClickedArray);
}

function RemovefromUnclickedNumsArray(TextBeforeReverse)
{
    
    let Num = Number(TextBeforeReverse)
    const index2 = UnClickedNumsArray.indexOf(Num);
    // console.log(index2);
    UnClickedNumsArray.splice(index2,1);
    // console.log("After");
    // console.log(UnClickedNumsArray);
}

// Match Occurs if text Content equals
function CheckForMatch(ReversedText,selectedDiv)
{
    let ReversedNum = (Number(ReversedText,selectedDiv));
    let foundIndex = (UnClickedNumsArray.findIndex((num)=> num===ReversedNum));
    // console.log(foundIndex);
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


function AddBgColorToMatchedDivs(selectedDiv, foundIndex)
{
    selectedDiv.style.backgroundColor = "red";
   UnClickedArray[foundIndex].style.backgroundColor = "red";
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



// function OhWhatNumberWasIt(selectedDiv)
// {
//     console.log("Yo");
//     selectedDiv.addEventListener("click", function FlipText()
//     {
//         selectedDiv.style.backgroundColor = "brown";
//         let text = selectedDiv.textContent;
//         let ReversedText = reveseString(text);
//         selectedDiv.textContent = reveseString();
//     })
// }


// function DeleteSquares()
// {
    //    while(MainDiv.hasChildNodes())
    //    {
        //     MainDiv.firstChild.remove();
        //    }
        // }
        
        
        
        
        function DisableUnclickedArray()
{
    
}
function ResetGame()
{

}
