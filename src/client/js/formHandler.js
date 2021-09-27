const createTR = (data1, data2, data3, data4, data5) => {
    const tr = document.createElement("tr")
    const row1 = document.createElement("td")
    row1.textContent = data1
    const row2 = document.createElement("td")
    row2.textContent = data2
    const row3 = document.createElement("td")
    row3.textContent = data3
    const row4 = document.createElement("td")
    row4.textContent = data4
    const row5 = document.createElement("td")
    row5.textContent = data5
    tr.appendChild(row1)
    tr.appendChild(row2)
    tr.appendChild(row3)
    tr.appendChild(row4)
    tr.appendChild(row5)
    return tr
}

function handleSubmit(event) {
    event.preventDefault()
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    let formText = document.getElementById('text').value
    if(!formText) {
        alert("Please provide a paragraph in the text area")
        return 
    }
    // check what text was put into the form field
    Client.checkForURL(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },        
        body: JSON.stringify({
            text: formText
        })
    })
    .then(data=>data.json())
    .then(
        data=>{
            const generalText = "-"
            const generalScoreTag = data.score_tag
            const generalAgreement = data.agreement
            const generalConfidence= data.confidence
            const generalData = createTR("General" , generalText, generalScoreTag, generalAgreement,generalConfidence)
            tableBody.appendChild(generalData)
            data.sentence_list.forEach(sentence=>{
                const sentenceText = sentence.text
                const sentenceScoreTag = sentence.score_tag
                const sentenceAgreement = sentence.agreement
                const sentenceConfidence= sentence.confidence
                const sentenceData = createTR("Sentence" , sentenceText, sentenceScoreTag, sentenceAgreement, sentenceConfidence)
                tableBody.appendChild(sentenceData)
                sentence.segment_list.forEach(segment=>{
                    const segmentText = segment.text
                    const segmentScoreTag = segment.score_tag
                    const segmentAgreement = segment.agreement
                    const segmentConfidence= segment.confidence
                    const segmentData = createTR("Segment" , segmentText, segmentScoreTag, segmentAgreement, segmentConfidence)
                    tableBody.appendChild(segmentData)
                })
            })
        }
    )
}

export { handleSubmit, createTR }
