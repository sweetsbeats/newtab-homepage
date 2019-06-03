var categories = {
    dummy:
    {
		dummy:
		[
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			
			
			
		],
		dummy:
		[
	    	{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				{url: "",          text: "dummy"},
				
			
		],
		dummy:
		[
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			{url: "",          text: "dummy"},
			
		],	
	},
    
    dev:
    {
		general:
		[
			{url: "https://sweetsbeats.herokuapp.com/", text:"devblog"},
			{url: "https://github.com/sweetsbeats/", text:"github"},
			{url: "https://github.com/sweetsbeats/dagashi", text:"dagashi"},
		],
		gamedev:
		[
			{url: "https://www.sfml-dev.org/documentation/2.5.0/annotated.php", text:"SFML Docs"},
			{url: "https://github.com/alecthomas/entityx", text:"EntityX Docs"},
			{url: "https://doc.mapeditor.org/en/stable/reference/tmx-map-format/", text: "TMX docs"},
			{url:"https://doc.mapeditor.org/en/stable/manual/keyboard-shortcuts/", text: "Tiled shortcuts"},
		],
	},
	
	hello:
	{
		video:
		[
			{url: "https://youtube.com/", text: "youtube"},
			{url: "https://www.crunchyroll.com/login?next=%2Fhome%2Fqueue", text: "crunchy"},
			{url: "", text: "funimation"},
			{url: "", text: "hidive"},
		],
		audio:
		[
			
			{url: "https:/soundcloud/.com/", text: "s.cloud"},
			{url: "https://audiotree.tv/",   text: "audiotree"},
		],
		torrent:
		[
			{url: "https://animebytes.tv/", text: "AnimeBytes"},
			{url: "https://nyaa.si/", text: "nyaa"},
			{url: "https://1337x.to/", text: "1337x"},
			//{url: "", text: ""},
		],
	},  
};



var currentPage = 0;
var maxPages = 2;

var transitioning = false;

changeBackground = function (num) {
    document.getElementById("imageDiv").style.backgroundImage = "url('res/" + num.toString() + ".gif')"; 

    let x = document.getElementsByTagName("h2");
    for (let i = 0; i < x.length; i++) {	
	x[i].style.backgroundImage = 
	    "linear-gradient(" + 
	    "rgba(0, 0, 0, 0.6)," +
	    "rgba(0, 0, 0, 0.6) )," +
        "url('res/" + num.toString() + ".gif')";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) {
		changeBackground( Math.floor(Math.random() * Math.floor(19)) + 1 );
	}

	// https://stackoverflow.com/questions/11761881/javascript-dom-find-element-index-in-container
	// IF RIGHT KEY PRESSED
	if (event.keyCode == 39) {
		if (currentPage < maxPages && !transitioning) {
			currentPage++;
			switchPage(currentPage, false);
			switchBarPage(currentPage-1, currentPage);

		}
	}
	// IF LEFT KEY PRESSED
	if (event.keyCode == 37) {
		if (currentPage > 0 && !transitioning) {
			currentPage--;
			switchPage(currentPage, true);
			switchBarPage(currentPage+1, currentPage);
		}
	}  
});

switchBarPage = function(from, to) {
	var statusBar = document.getElementById("statusBar");
	var nodes = Array.prototype.slice.call(statusBar.children); 
	var node = nodes[from]; // 3
	var toNode = nodes[to]; // 2

	node.classList.add("switchFromBarPage");
	node.addEventListener("animationend", function(event) {
		node.removeEventListener("animationend", arguments.callee);
		node.classList.remove("statusBarPageSelected");
		node.classList.remove("switchFromBarPage");
			
		toNode.classList.add("statusBarPageSelected");
		toNode.classList.add("switchToBarPage");
	});

	toNode.addEventListener("animationend", function(event) {
		toNode.removeEventListener("animationend", arguments.callee);
		toNode.classList.remove("switchToBarPage");	
	});
}

/*

	TODO: Rewrite switchPage to match the style of animation used in switchBarPage
		 this will allow us to trigger 

*/

// isRight == going right instead of left
switchPage = function(toPage, isRight) {
	transitioning = true;

	document.getElementById("innerContainer").classList.add("squishIn");

	document.getElementById("innerContainer").addEventListener("animationend", function(event) {
		document.getElementById("innerContainer").removeEventListener("animationend", arguments.callee);
		console.log("Animation finished!");
		innerContainer = document.getElementById("innerContainer");
		document.getElementById("innerContainer").classList.remove("squishIn");
		document.getElementById("container").removeChild(innerContainer);

		var newdoc = document.createElement("div");
		newdoc.setAttribute("id", "innerContainer");
		document.getElementById("container").appendChild(newdoc);
	
		document.getElementById("innerContainer").classList.add("squishOut");
		document.getElementById("innerContainer").addEventListener("animationend", function(event) {
			document.getElementById("innerContainer").removeEventListener("animationend", arguments.callee);
			document.getElementById("innerContainer").classList.remove("squishOut");
			transitioning = false;
		});

		// Determine next 
		document.getElementById("innerContainer").innerHTML = 
		String.raw`<div id="imageDiv">  
		<div id="imageTextBox">  
		 
		</div>
		</div>
		<div id="siteListings"> </div>`

		switch (toPage) {
			case 0:
				document.getElementById("imageTextBox").classList.add("landingTextBox");	
				document.getElementById("imageTextBox").innerHTML = `H<br/>E<br/>L<br/>L<br/>O<br/>`;
				populateList(categories.hello);
				changeBackground(14);
				break;
			
			case 1:
				document.getElementById("imageTextBox").classList.add("devTextBox");
				document.getElementById("imageTextBox").innerHTML = `D<br/>E<br/>V`;
				populateList(categories.dev);
				changeBackground(6);
				break;
				
			case 2:
				document.getElementById("imageTextBox").classList.add("boardsTextBox");
				document.getElementById("imageTextBox").innerHTML = `D<br/>U<br/>M<br/>M<br/>Y`;
				populateList(categories.dummy);
				changeBackground(1);
				break;
				
			case 3:
				document.getElementById("innerContainer").innerHTML = `<img src="https://files.catbox.moe/ob9zxn.gif"></img> 
				<p style="color:white; font-size:20px">This is an example site to show off my homepage in action. <br/> 
				You can check out my dev blog <a href="https://sweetsbeats.herokuapp.com/">here</a></p>`;
			default:
				break;
		}
	});
}

document.addEventListener("DOMContentLoaded", function() {
    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
    populateList(categories.hello);
	changeBackground(14);
	
	var statusBar = document.getElementById("statusBar");
	var nodes = Array.prototype.slice.call(statusBar.children); 

	nodes.forEach(function(node, i) {
		node.addEventListener("click", function() {
			if (!transitioning && node.classList.contains("statusBarPage")) {
				if (currentPage != i) {				
					oldPage = currentPage;
					currentPage = i;
					
					if (currentPage > oldPage) {
					switchPage(currentPage, false);
					}
					else {
						switchPage(currentPage, true);
					}
					switchBarPage(oldPage, currentPage);
				}
			}
		}); 
	});
});


populateList = function ( currPage ) {
    
    for( let k in currPage ) {
		console.log(k);
		let seperator = document.createElement("div");
		let seperatorName = document.createElement("h2");
		let seperatorHeader = document.createElement("div");
		
		seperatorName.textContent = k;	
		seperator.className = "siteListingsSeperator";
		seperatorHeader.appendChild(seperatorName);
		seperator.appendChild(seperatorHeader);
		
		for (let i in currPage[k] ) {
			console.log( currPage[k][i] );
			
			let entry = currPage[k][i];
			
			let site = document.createElement("div");
			site.className = "listing";
			
			let name = document.createElement("a");
			name.textContent = entry.text;
			name.href = entry.url;
			
			site.appendChild(name);
			seperator.appendChild(site);

			document.getElementById("siteListings").appendChild(seperator);
		}
    }  
}