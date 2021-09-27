function checkForURL(inputText) {
    // console.log("::: Running checkForName :::", inputText);

    const URLs = inputText.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)

    if(URLs) {
        alert("URLs Founded:\n" + URLs.join("\n"))
    }
    return true
}

export { checkForURL }
