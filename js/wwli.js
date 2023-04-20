/**
 * @author: wxn0brP
 * @license: MIT
 * @version: 0.1;
*/

var lo = console.log;

class ___{
    constructor(data){
        if(typeof data === 'string'){
            this.res = qrs(data);
        }else if(typeof data === 'object'){
            this.res = data;
        }else{
            this.res = null;
        }
        if(!this.res) alert("res is null");

        function qrs(d){
            if(
                data == "" ||
                data == null ||
                data.length <= 1
            ) return null;
            
            if(d.startsWith("#")){
                return document.getElementById(d.substring(1));
            }else if(d.startsWith(".")){
                return document.querySelector(d.substring(1));
            }else if(d.startsWith("$")){
                return [...document.querySelectorAll(d.substring(1))];
            }else if(d.startsWith("@")){
                return document.getElementsByTagName(d.substring(1));
            }else if(d == "body"){
                return document.body;
            }else{
                return null;
            }
        }
    }

    get(){
        return this.res;
    }
    g(){
        return this.res;
    }


    /* html */

    html(data=null){
        if(data==null) return this.res.innerHTML;
        this.res.innerHTML = data;
        return this;
    }

    htmlP(data){
        this.res.innerHTML += data;
    }

    valueP(data){
        this.res.value += data;
    }

    value(data=null){
        if(data==null) return this.res.value;
        this.res.value = data;
        return this;
    }

    cont(){
        if(this.res.innerHTML != "") return this.res.innerHTML;
        if(this.res.value != "") return this.res.value;
        return "";
    }

    htmlA(data, br=false){
        this.res.innerHTML += data + (br ? "<br />" : "");
        return this;
    }

    add(child){
        this.res.appendChild(child);
        return this;
    }
    
    children(element){
        const childNodes = element.childNodes;
        const children = [];
        for(let i = 0; i < childNodes.length; i++){
            const child = childNodes[i];
            if(child.nodeType === Node.ELEMENT_NODE){
                children.push(child);
            }
        }
        return children;
    }
    

    /* css */

    style(data=null){
        if(data==null) return this.res.style;
        this.res.style = data;
        return this;
    }

    classList(data=null){
        if(data==null) return this.res.classList;
        this.res.classList = data;
        return this;
    }

    css(att, arg){
        this.res.setAttribute(att, arg);
        return this;
    }
    
    cssAC(arg){
        this.res.classList.add(arg);
        return this;
    }
    
    cssRC(arg){
        this.res.classList.remove(arg);
        return this;
    }
    
    cssTC(className){
        this.res.classList.toggle(className);
        return this;
    }

    cssC(className){
        this.res.classList.contains(className);
    }


    /* js */

    on(event, func){
        this.res.addEventListener(event, func);
    }

    lo(json=false){
        json ? lo(JSON.stringify(this.res)) : lo(this.res);
        return this;
    }


    /* exit */

    slideUp(duration=500){
        this.res.style.transition = `height ${duration}ms ease-out`;
        this.res.style.overflow = "hidden";
        this.res.style.height = "0";
        return this;
    }

    slideDown(duration=500){
        this.res.style.transition = `height ${duration}ms ease-in`;
        this.res.style.overflow = "hidden";
        this.res.style.height = "auto";
        let height = this.res.clientHeight;
        this.res.style.height = "0";
        setTimeout(() => {
            this.res.style.height = height + "px";
        }, 0);
        return this;
    }

    slideToggle(duration=500){
        if(this.res.style.overflow==""){
            this.slideDown(5);
            setTimeout(() => this.slideUp(duration), 20);
        }else
        this.res.offsetHeight == 0 ? this.slideDown(duration) : this.slideUp(duration)
        return this;
    }
}

HTMLElement.prototype.to__ = function(){
    return new ___(this);
}
  
var __ = function(d){
    return new ___(d);
}

/* html */

__.scrollTo = function(targetElement, duration=500){
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    function ease(t, b, c, d){
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
}

/* math */

__.math = function(){}

__.math.rand = function(min, max){
	return Math.round(Math.random() * (max-min) + min);
}

__.math.pow2 = function(a){
	return a*a;
}

__.math.pow = function(a, b){
	return a ** b;
}

__.math.sqrt = function(a, w){
	return a ** (1/w);
}

__.math.round = function(a, b){
	var factor = __.math.pow(10, b);
	return Math.round(a*factor)/factor;
}

__.math.max = function(tab){
	if(tab.length == 0)return 0;
	let m = tab[0];
	tab.forEach(function(t){
		if(t>m) m=t;
	})
	return m;
}

__.math.min = function(tab){
	if(tab.length == 0)return 0;
	let m = tab[0];
	tab.forEach(function(t){
		if(t<m) m=t;
	})
	return m;
}


/* string */

__.str = function(){}

__.str.compareStr = function(a,b){
	var ile = 0;
	var minLength = (a.length > b.length) ? b.length : a.length;
	var maxLength = (a.length < b.length) ? b.length : a.length;
	for(let i=0; i<minLength; i++){
		if(a[i] == b[i]){
			ile++;
		}
	}
	return Math.round((ile / maxLength)*100);
}


/* mobile */

__.mobile = function(){
    let x = window.innerWidth;
    __.mobile.mob = (x <= 500);
    __.mobile.tab = (x > 500 && x < 850);
    return __;
};

__.mobile.mob = false;
__.mobile.tab = false;


/* http get */

__.httpReq = function(url){
    if(url == "") throw new Error("url not defined");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    
    if(xhr.status == 200){
        return xhr.responseText;
    }else if(xhr.status == 404){
        return false;
    }else return null;
}


/* debug */

__.debug = function(event){
    let nativeLog = console.log.bind(console);
    console.log = function(text){
        nativeLog(text);
        event(text);
    }
    lo = console.log;
}


/* menu */

__.toggleMenu = function(){
    __("#navs").cssTC("responsive");
}


/* url param */

__.updateURLParameter = function(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if(additionalURL){
        tempArray = additionalURL.split("&");
        for(let i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

__.urlParam = function(name, val){
    window.history.replaceState('', '', __.updateURLParameter(window.location.href, name, val));
}


/* val Watcher */

class ValWatcher{
    constructor(initialValue, se=()=>{}, ge=()=>{}){
        this._v = initialValue;
        this._se = se;
        this._ge = ge;
    }

    get v(){
        this._ge();
        return this._v;
    }

    set v(newValue){
        this._v = newValue;
        this._se(newValue);
    }
}

var vw = function(data, call=()=>{}){
    return new ValWatcher(data, call);
}