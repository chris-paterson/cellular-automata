// Took the following code as a base:
// https://gist.github.com/mpj/94427edd9a5ed4d2cc677f1ae0a0558b

// Followed along with:
// https://www.youtube.com/watch?v=bc-fVdbjAwk

let blockSize = document.querySelector('.row').clientHeight

console.log(blockSize);

function randomBinary() {
    return Math.floor(Math.random() * 2)
}

// Create divs for the first row.
for (let i = 0; i < screen.width / blockSize; i++) {
    let div = document.createElement('div')
    document.querySelector('.row').appendChild(div)
}

function randomizeRow(row) {
    for (let i = 0; i < row.childNodes.length; i++) {
        let target = row.childNodes[i]
        target.classList.add(randomBinary() ? 'active' : 'inactive')
    }
}

// Randomly set active or inactive in seed row
randomizeRow(document.querySelector('.row'))

function duplicateRow() {
    let allRows = document.querySelectorAll('.row')
    let lastRow = allRows[allRows.length - 1]
    let clone = lastRow.cloneNode(true)

    document.querySelector('.automaton').appendChild(clone)
    processRow(clone, lastRow)
}

function processRow(row, parentRow) {
    for (let i = 0; i < row.childNodes.length; i++) {
        let target = row.childNodes[i]
        let previousSelf = parentRow.childNodes[i]
        let leftSibling = 
            previousSelf.previousElementSibling ||
            parentRow.childNodes[parentRow.childNodes.length - 1]
        let rightSibling = 
            previousSelf.nextElementSibling ||
            parentRow.childNodes[0]

        let toggleClass = setActiveIfMatchesRule
            .bind(null, target, leftSibling, previousSelf, rightSibling)

        // Rules
        toggleClass([1,1,1], false)
        toggleClass([1,1,0], true)
        toggleClass([1,0,1], false)
        toggleClass([1,0,0], false)
        toggleClass([0,1,1], true)
        toggleClass([0,1,0], false)
        toggleClass([0,0,1], false)
        toggleClass([0,0,0], true)
        
        // toggleClass([1,1,1], false)
        // toggleClass([1,1,0], false)
        // toggleClass([1,0,1], true)
        // toggleClass([1,0,0], true)
        // toggleClass([0,1,1], false)
        // toggleClass([0,1,0], true)
        // toggleClass([0,0,1], true)
        // toggleClass([0,0,0], false)
    }
}


function setActiveIfMatchesRule(
    target, leftSibling, previousSelf, rightSibling, rule, ruleValue
) {
    let matchesRule =
        state(leftSibling) === rule[0] &&
        state(previousSelf) === rule[1] &&
        state(rightSibling) === rule[2]
    if(matchesRule) {
        setIsActive(target, ruleValue)            
    }
}

function state(cell) {
    return cell.classList.contains('active') ? 1 : 0
}

function setIsActive(cell, isActive) {
    if (isActive) {
      cell.classList.remove('inactive')
      cell.classList.add('active')
    } else {
      cell.classList.remove('active')
      cell.classList.add('inactive')
    }
}

for (var i = 0; i < screen.height / blockSize; i++) {
    duplicateRow()
}