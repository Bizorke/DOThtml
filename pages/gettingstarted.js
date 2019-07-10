exports = dot.h1("Getting Started")
.h2("Download")
.div(
	dot
	.div("Download version " + dot.version + "").class("btn btn-primary").style(dotcss.position("absolute").left(0).widthP(40)).onclick(function(){ window.open("https://github.com/JSideris/DOThtml/releases/download/v" + dot.version + "/dothtml.js"); })
	.div("Or check it out on GitHub").class("btn btn-info").style(dotcss.position("absolute").right(0).widthP(40)).onclick(function(){ window.open("https://github.com/JSideris/DOThtml")})
).style(dotcss.position("relative").width("100%").height(32))
.h2("Learn")
.h('<iframe width="560" height="315" src="https://www.youtube.com/embed/vuokupujbsE" frameborder="0" allowfullscreen></iframe>')
.h2("Basic Usage")

.featuretutorial(
	"Building & Rendering Markup", 
	dot.h("Use the <code>dot(target)</code> to render DOT syntax to HTML. <code>target</code> is the CSS selector for the target element(s) to which the rendered markup will be appended. Support for querying multiple targets will be added in a future version of DOThtml. <code>dot(target)</code> returns a chainable <i>page-building object</i>, which contains many <i>page-building functions</i> that wrap each HTML tag, attribute, and more!").br().br()
	.h("There are also special chainable building functions for printing out pure HTML markup (<code>h(markup)</code>) or HTML-escaped text nodes (<code>t(text)</code>). We'll start off with an obligatory <i>hello world</i> example."), 
function(){
return dot("#example0output")
.h("<b>Hello,</b>")
.t("<b>world!</b>");
},
	dot.h("<code>dot(target)</code> can be used as a function if you intend to render the resultant HTML to a specific target. However, the name <code>dot</code> is more than just a function; it is an instance of DOThtml's page-building object and has access to all of the page-building functions. This is useful for building nested elements in which you don't need to explicitly state a render target (as we'll do in the next example).").br().br()
	.h("This tutorial is designed in a way that the page-building object for each tutorial segment's code is a nested component of a tutorial widget. So, the other tutorials will not use <code>dot</code> as a function as you normally would once at the top of your code.").br().br()
	.h("It's smart to put your DOThtml script under your body element so that the body is ready by the time the script executes. Also, DOThtml is designed to build UI. Most meta or header HTML tags that you wouldn't find inside a page's <code>&lt;body&gt;</code> are not supported.")
)
.featuretutorial(
	"HTML Building",
	dot.h("In this example we'll render some real HTML elements with attributes to build a mini webpage. DOThtml's syntax went through many iterations as well as testing on real websites to ensure that the final product feels like a light-weight, functional improvement over HTML."),
function(){
return dot.h4("Example 2")
.div(
dot
.p("Paragraph 1").style("font-weight: bold; float: left;")
.p("Paragraph 2").class("blue-italics").style("float: right;")
)
.br().clear("all")
.button("Click Me").type("button").class("e1btn")
.onclick("alert('You clicked the button!');");
},
	dot.h("Note that attributes in DOThtml have the exact same syntax as elements. Any number of attributes can be chained together after an element, and those attributes will attach themselves to the preceeding erlement.").br().br()
	.h("There are five attributes in HTML that have the same name as an element: <code>cite</code>, <code>form</code>, <code>label</code>, <code>span</code>, <code>summary</code>. DOThtml is smart enough to determine from context whether you intended to use these functions to produce an element or to produce an attribute. There are also explicit wrappers for these five names that force DOThtml to explicitly produce an element or to produce an attribute regardless of context. Just add an A or an E to the name of the page building function. For instance: <code>dot.div().formA(value)</code> will explicitly add a form attribute to the div, even though this is erroneous. Since the extended documentation for DOThtml is currently in progress, please refer to the source code (or contact the developer) for more info on contextual element/attribute selection.").br().br()
	.h("<code>accept-charset</code> is currently the only hyphenated HTML attribute (with the exception of custom, or special attributes like <code>data-*</code>). To add a <code>accept-charset</code>, use the <code>acceptcharset(value)</code> function. The <code>data-*</code> attribute can be added to an element using the <code>data(suffix, value)</code> function. This is the only native DOThtml attribute function that accepts two parameters.")
)
.featuretutorial("Advanced Building Tools & Nesting",
	dot.h("In DOThtml, element building functions can accept a variety of different things as parameters. Omitting a parameter or passing in <code>null</code>, or <code>undefined</code>, will leave the new element empty. A string argument will typically result in that string being parsed as HTML inside the new element's innerHTML. Any DOT page building object can be used as arguments to create a nested element with pure DOThtml syntax. Arrays will render as a concatenation of recursively rendered elements. Finally, any functions passed into any element functions will be evaluated and DOThtml will attemp to recursively use their return values to build markup.").br().br()
	.h("Attribute building functions typically accept a string value. If no string is passed to an attribute, the attribute name will be used as it's value. This is typical for void attributes, like <code>enabled</code>. <code>dot.input().enabled()</code> will generate <code>").t("<input enabled=\"enabled\" />").h("</code>. Attribute building functions can also accept functions. ").br().br()
	.h("Attribute building functions will attempt to call the <code>toString()</code> function on unknown objects, however, the behavior of element building functions on unknown objects has not been formalized; for now unsupported objects (anything that's not a DOThtml page building object, a function, or an array) will be ignored.").br().br()
	.h("Avoid passing in values to void elements, like <code>img</code> or <code>br</code>."),
function(){
return dot.h4("DOThtml joins processed array elements, and...")
.ul([
"<li>Accepts markup text.</li>", 
dot.li("Renders nested DOT markup."),
dot.li(
dot.span("Has ") 
+ dot.span("toString() ") 
+ dot.span("overrides.")
),
dot.li(function(){return "Accepts functions."}),
function(){return dot.li("Is recursive.")},
dot.li("<i>And more!</i>")
]);
}
)
.featuretutorial("Multi-line Events",
	dot.h("DOThmtl automatically renders inline function values for event attributes like <code>onclick</code> with named placeholders. The event handlers will be passed a standard JavaScript event argument. Try running this example mulitple times to get a feel for how it works."),
function(){
return dot.button("Try me.").id("multi-line-event-example").type("button")
.onclick(function(e){
alert("You clicked " + e.target.id);
});
},
	dot.h("Many developers like to keep business logic separate from front end markup. That principal can be upheld with DOT syntax; just know that this technique is an option.")
)
.featuretutorial("Conditional Markup",
	dot.h("Here's another thing pure HTML can't do. <code>if(condition, callback).elseif(condition, callback).else(callback)</code>. Conditions are evaluated based on JavaScript truthiness where everything is true except for <code>false</code>, <code>0</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>."),
function(){
return dot.button("Rock Paper Scissors.").id("multi-line-event-example")
.onclick(function(e){
rpsCounter = Math.random();
dot("#rps-out").empty()
.if(rpsCounter <= (1 / 3), "Rock!")
.elseif(rpsCounter <= (2 / 3), "Paper!")
.else("Scissors!");
})
.br()
.br()
.span("Click the button.").id("rps-out")
.style("border: 4px solid black; padding: 2px;");
},
	dot.h("Note that the <code>callback</code> parameter can be replaced with any DOThtml element building or attribute building object or function. New attributes will be added to the preceeding element.")
)
.featuretutorial("Iterative Markup",
	dot.h("There are two iterative page building functions. <code>each(array, callback)</code> will execute the function <code>callback(element)</code> once for each element in <code>array</code>, passing in the element as a parameter. <code>iterate(iterations, callback, params)</code> will call the function <code>callback(i, params)</code> where <code>i</code> is a 0-based integer representing the current iteration number, and <code>params</code> is optionally any JavaScript object or value that you'd like to have available inside the loop. <code>iterations</code> is the number of times to iterate.<br /><br />")
	.h("The return values of both page building functions are treated as page building objects and will be concatenated to the target as expected."),
function(){
return dot.ul(
//Example 1: each
dot.each(["apple", "banana", "orange", "mango"], function(fruit){
return dot.li(fruit);
})

//Example 2: iterate
.iterate(4, function(i, params){
//Let's reverse the list for this demonstration.
return dot.li(params[params.length - i - 1]);
}, ["apple", "banana", "orange", "mango"])
);
}
)
.featuretutorial("Timed Markup",
	dot.h("The <code>wait(timeout, markup)</code> page building function creates an empty <code>&lt;x-dothtml-timeout&gt;</code> element as a placeholder, and replaces it with markup generated by the page building object <code>markup</code> after <code>timeout</code> milliseconds. The timer for nested timed elemnets starts immediately after the <code>wait</code> function is called, and doesn't wait for parent timed elements."),
function(){
return dot.ul(
dot.li("START")
.wait(1000, dot.li("one"))
.wait(2000, dot.li("two"))
.wait(3000, dot.li("three"))
.wait(4000, dot.li(
dot.ul(
dot.li("four")
.wait(5000, dot.li("five"))
)
))
.li("END")
) //Oh, and timed attributes can also be dropped.
.wait(6000, dot.style("color: red;")); 
},
	dot.h("<code>&lt;x-dothtml-timeout&gt;</code> is a custom element. Most browsers will treat it as an empty <code>&lt;span&gt;</code>, as per the <a href=\"https://www.w3.org/TR/html5/infrastructure.html#extensibility-0\" target=\"_blank\">W3C spec</a>.")
)
.featuretutorial("Custom Elements and Attributes",
	dot.h("At any time you can use the <code>el(name, markup)</code> and <code>attr(name, value)</code> to explicitly create a specific HTML element or attribute respectively, without relying on DOThtml's built-in page building functions."),
function(){
return dot.el("div", "This could be any HTML or custom element!")
.attr("style", "color: white; background-color:black; padding: 10px;");
},
	dot.h("This can be useful when defining custom elements and attributes, or when experimenting with elements and attributes supported in future versions of HTML that have not yet been implemented in DOThtml.")
)
.featuretutorial("Running Scripts",
	dot.h("This is required for the next two examples. Using <code>dot.script()</code> allows us to run anonymous code in-line. ")
	.h("It accepts a function parameter, and will immediately run the function. Return values are ignored. ")
	.h("<code>dot.h()</code> and <code>dot.t()</code> can also be used to run an anonymous function-runner, except they will render return values (if any) as markup. "),
function(){
return dot.div().id("script-example-div")
.script(function(){
setTimeout(function(){
dot("#script-example-div").h("Why hello there!");
}, 100);
});
},
	dot.h("Note that this example wouldn't work without the timeout because it doesn't get rendered to DOM until after everything is run and returned to the example widget. ")
	.h("Thus, <code>script-example-div</code> doesn't exist until when the <code>dot.script()</code> is called. ")
	.h("If the parent <code>dot</code> were used as a targeting function as in <code>dot(\"#example-X\")</code>, this wouldn't be a problem.")
)
.featuretutorial("Grabbing the Last DOM Node",
	dot.h("Ocasionally you'll want to access the last node added. New in version 1.3, there is an easy way to do this. Use <code>dot.lastNode</code>. ")
	.h("This is useful for storing the node for later so that its nodely properties (such as scroll position, etc) can be accessed and manipulated even after the node has been written to the DOM. "),
function(){
return dot.h(function(){
//We'll use h here with a function so that we can do 
//some complex logic and render it to the DOM.
var myDivChain = dot.div("Will this work?");

//We can just add a button afterwards like this.
return myDivChain
.br().button("Try it.").onclick(function(){
//Note how lastNode DOESN'T target the button.
myDivChain.lastNode.innerHTML = "Hopefully.";
})
})
},
	dot.h("Pro tip: if you prefer JQuery as your node manager, just pass <code>dot.lastNode</code> right into <code>$()</code> (but this is a JQuery feature, strictly speaking, and has nothing to do with DOThtml).")
)
.featuretutorial("Custom Widgets",
	dot.h("You can register a custom widget with <code>dot.component({name: ..., constructor: ..., builder: ..., ready: ...})</code> where <code>name</code> is the name of the widget that will be accissible from any DOThtml page building objects, <code>builder</code> is your own custom page building function that returns DOT syntax. <code>construcotr</code> and <code>ready</code> are optional functions that are called before and after the elements are added to the DOM. All functions are scoped to a special instance of the component, and the <code>this</code> keyword can be used to store local variables or bindings, or to access the most parent (or last-added) element in the component. Here are a few examples."),
function(){
return dot.script(function(){
//Normally widgets can be declared at the top of your code,
//but the widget this website uses to print examples
//will only display dot code. See the page source for more info.

//Here we define three widgets.

//1. Widget that applies a custom style to the previous element.
//Note the alternate (legacy) syntax of component(name, builder).
dot.component("applyStyles", function(){
//DOTcss is a pretty cool library too. No dependency on DOThtml.
//Check it out.
return dot.style(
dotcss.color(
Math.random() * 256, 
Math.random() * 256, 
Math.random() * 256));
});

//2. Widget that prints out each element in an array inside a custom
//container. This is an improvement over DOThtml's native
//array-joining functionality.
//This widget is available in the DOThtml-ui library.
dot.component("wrappedList", function(array, wrapperBuilder){
return dot.each(array, function(element){
return wrapperBuilder(element);
});
});

//3. This widget uses the previous two widgets to
//generate a stylized ordered list from an array.
dot.component("stylizedOrderedList", function(array){
return dot.ol(
dot.wrappedList(array, function(element){
return dot.li(element).applyStyles();
})
);
});

//3. This widget uses the previous two widgets to
//generate a stylized ordered list from an array.
dot.component("stylizedOrderedList", function(array){
return dot.ol(
dot.wrappedList(array, function(element){
	return dot.li(element).applyStyles();
})
);
});
})//We can now use them immediately. Just 1 Line of code!
.stylizedOrderedList(["Aye", "Bee", "Sea", "Di"]);
},
dot.h("You can overwrite a previously-defined widget by calling component again with the same widget name. Avoid overwritting built-in DOThtml functions or properties as this could render DOThtml unusable.")
)
.featuretutorial("JQuery Wrappers",
	dot.h("DOThtml is not a JQuery addon and does not have a mandatory dependency on JQuery. However, if JQuery is available you will be able to use several JQuery event and transition wrappers.").br().br()
	.h("Currently, the following JQuery functions are supported: <code>animate</code>, <code>css</code>, <code>empty</code>, <code>fadeIn</code>, <code>fadeOut</code>, <code>fadeTo</code>, <code>hide</code>, <code>show</code>.").br().br()
	.h("In addition, DOThtml supports the following JQuery events: <code>blur</code>, <code>change</code>, <code>click</code>, <code>dblclick</code>, <code>focus</code>, <code>focusin</code>, <code>focusout</code>, <code>hover</code>, <code>keydown</code>, <code>keypress</code>, <code>keyup</code>, <code>mousedown</code>, <code>mouseenter</code>, <code>mouseleave</code>, <code>mousemove</code>, <code>mouseout</code>, <code>mouseover</code>, <code>mouseup</code>, <code>one</code>, <code>resize</code>, <code>scroll</code>, <code>select</code>, <code>submit</code>. ").br().br()
	.h("JQuery wrappers behave like DOThtml attribuets. They get attached to the previous element. To use a wrapper, add a <code>$</code> character in front of the name, for instance: <code>dot.div().$animate(args)</code>. The usage and parameters of each wrapped function are exactly the same as specified in the JQuery documentation pages, except that the return value of any callbacks will be interpreted as DOT syntax and rendered.").br().br()
	.h("The goal for DOThtml is to ultimately not be dependent on any external libraries. So in the future all of these functions will ideally become native in DOThtml."),
function(){
return dot.div().style(dotcss.width(100).height(100).backgroundColor(0x000000))
.wait(1000, function(){
//Remember to use return in all DOT functions, or they won't work!
return dot.$animate({width: 200, height: 200})
});
}
).br().br().br().br().br()