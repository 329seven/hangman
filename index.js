var data = ['abruptly','absurd','abyss','affix','askew','avenue','awkward','bagpipes','bandwagon','banjo','beekeeper','bikini','blitz','blizzard','boggle','bookworm','boxcar','boxful','buckaroo','buffalo','buffoon','buxom','buzzard','buzzing','buzzwords','cobweb','crypt','cycle','dizzying','duplex','dwarves','embezzle','equip','espionage','exodus','faking','fishhook','fixable','flapjack','flopping','fluffiness','foxglove','frazzled','frizzled','funny','gabby','galaxy','gazebo','gizmo','glowworm','gnarly','gnostic','gossip','grogginess','haphazard','hyphen','icebox','injury','ivory','jackpot','javascript','jawbreaker','jazziest','jazz','jelly','jigsaw','jinx','jiujitsu','jockey','jogging','joking','joyful','juicy','jukebox','jumbo','kayak','kazoo','keyhole','kiosk','kitsch','kiwifruit','klutz','lengths','lucky','luxury','marquis','matrix','megahertz','microwave','mystify','nightclub','nowadays','numbskullv','nymph','onyx','oxidize','oxygen','peekaboo','pixel','pneumonia','psyche','puppy','puzzling','quartz','queue','quiz','quizzes','razzmatazz','rhubarb','rhythm','schnapps','scratch','snazzy','sphinx','staff','strengths','stretch','stronghold','subway','syndrome','thriftless','thumbscrew','transcript','transgress','transplant','twelfths','unknown','unworthy','unzip','uptown','vaporize','vixen','vodka','voodoo','vortex','walkway','wave','wheezy','whiskey','whizzing','wimpy','wizard','wristwatch','xylophone','yachtsman','yippee','youthful','yummy','zigzag','zigzagging','zipper','zodiac', 'zombie']

data = data.map(x => x.toUpperCase())

var root = document.getElementById("root")

var mainCon = document.createElement("div")
mainCon.setAttribute("class", "maincon")

var alphaCon = document.createElement("div")
alphaCon.setAttribute("class", "alphacon")

var wordCon = document.createElement("div")
wordCon.setAttribute("class", "wordcon")

var answerCon = document.createElement("div")
answerCon.setAttribute("class", "answercon")

var infoCon = document.createElement("div")
infoCon.setAttribute("class", "infocon")

var divsArr = [alphaCon, wordCon, answerCon, infoCon].map(x => mainCon.appendChild(x))
root.appendChild(mainCon)

var alphabet = []
var alphaP = []
for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i))
    alphaP.push(document.createElement("p"))
}

var outerP = document.createElement("div")
outerP.setAttribute("class", "outerp")
var addTextAlpha = alphaP.map((x,i) => {
outerP.append(x)
x.textContent = alphabet[i]
x.style.color = "white"
})

alphaCon.appendChild(outerP)    

var answerInputLabel = document.createElement("label")
answerInputLabel.textContent = "Enter Letter or guess word?"
answerInputLabel.setAttribute("for", "answer")
var answerInput = document.createElement("input")
answerInput.setAttribute("type", "text")
answerInput.setAttribute("id", "answer")
answerInput.setAttribute("name", "answer")
answerInput.setAttribute("value", "")
var ansBtn = document.createElement("button")
ansBtn.setAttribute("class", "ansbtn")
ansBtn.textContent = "submit"
ansBtn.disabled = true
answerCon.appendChild(answerInputLabel)
answerCon.appendChild(answerInput)
answerCon.appendChild(ansBtn)
ansBtn.addEventListener("click", slipknot)
answerInput.addEventListener("keypress", slipknotEnter)

var lifeCount = 10; 

var life = document.createElement("h1")
life.setAttribute("class", "life")
life.textContent = `You Have ${lifeCount} lifes left.`;
var startBtn = document.createElement("button")
startBtn.setAttribute("class", "startbtn")
startBtn.textContent = "start";  
infoCon.appendChild(life)
infoCon.appendChild(startBtn)

let cancelBtn = document.createElement("button")
cancelBtn.setAttribute("class", "cancelbtn")
cancelBtn.textContent = "Cancel"
cancelBtn.addEventListener("click", cancel)

startBtn.addEventListener("click", startHang)
var holdWordP = []
var dataHold; 
var winningCount; 

function startHang() {  
    ansBtn.disabled = false
    var ran = Math.floor(Math.random() * data.length)
    dataHold =  data[ran].split("")
    dataHold.map(x => holdWordP.push(document.createElement("p")))
    holdWordP.map((x,i) => {
    if (dataHold[i] != " ") {    
    x.textContent = dataHold[i]
   x.style.borderBottom = "2px solid white"
    } else { x.textContent = "-" }
    wordCon.append(x)})
    infoCon.replaceChild(cancelBtn, startBtn)
    winningCount = dataHold.length;
}


var resultDiv = document.createElement("div")
resultDiv.setAttribute("class", "resultdiv")
var finalAnswer = document.createElement("p")
var finalResult = document.createElement("p")
var finalbtn = document.createElement("button")
finalbtn.textContent = "Start Again"; 
var resMap = [finalAnswer, finalResult, finalbtn].map(x => resultDiv.appendChild(x))
finalbtn.addEventListener("click", startAgain)


function winOrLose(str) {
holdWordP.map(x => { if (x.textContent != "-") { x.style.color = "white"}}) 
life.textContent = str
infoCon.replaceChild(finalbtn, cancelBtn)
}


var holdP = document.createElement("p")
holdP.style.color = "white"


function slipknot(e) {
    
var input = answerInput.value.toUpperCase().trim()
var inputValidate = input.match(/^[a-z]+\s{0,1}[a-z]*$/gi)
var preDup = input.length == 1 ? alphaP.filter(x => x.textContent == input) : [holdP]
if (inputValidate != null && preDup[0].style.color == "white") {
if (input.length == 1)  {
dataHold.map((x,i) => { if (x == input) { holdWordP[i].style.color = "white";} })   
var philData = dataHold.filter(x => x == input).length; 
winningCount -= philData; 
life.textContent = `You Have ${lifeCount} lifes left.`;
if (philData == 0) {
lifeCount -= 1
life.textContent = `You Have ${lifeCount} lifes left.`;
alphaP.map(x => { if (x.textContent == input) { x.style.color = "red"}})
} else {
alphaP.map(x => { if (x.textContent == input) { x.style.color = "green"}})
} } else {
if (input == dataHold.join("")) { winOrLose("Winner") } else {
lifeCount -= 1; life.textContent = `You Have ${lifeCount} lifes left.`; }
} } else {
inputValidate == null ? life.textContent = "invalid input" : life.textContent = "Duplicate Answer"
}
if (lifeCount == 0) { winOrLose("Loser") }
if (winningCount == 0) { winOrLose("Winner") }
answerInput.value = ""
}


function slipknotEnter(e) {
   if (e.key == "Enter") {
   slipknot()
   }
}

function cancel() {
ansBtn.disabled = true
dataHold = undefined; holdWordP = [];     
wordCon.textContent = "";
infoCon.replaceChild(startBtn, cancelBtn)
alphaP.map(x =>  x.style.color = "white") 
lifeCount = 10
life.textContent = `You Have ${lifeCount} lifes left.`;
} 


function startAgain() {
    infoCon.replaceChild(cancelBtn, finalbtn)
    cancel()

}


