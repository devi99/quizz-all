
//import loadAppController from "./baseFunc";
import { loadAppController } from "./baseFunc";

export default class uiuxCtrl {

    constructor() {
        //super();
        this.mobileNavToggle;
        this.mobile;
        console.log('uiux constructor');
        this.init();
    }

    //sic. we do not take into consideration IE browser
    detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    } 

    /* Strip URL into app/view/params */
    handleURL(routeList) {
        this.closeNav();
        // grab everything behind the server url
        let ctrlToLoad = "/";
        let fullPath = window.location.pathname.substr(window.location.pathname.indexOf('/') + 1);
        fullPath = fullPath.toLowerCase();

        let pathArr = fullPath.split('/');
        if (pathArr.length > 1) {
            ctrlToLoad = routeList[pathArr[0]];
        } else {
            ctrlToLoad = routeList[fullPath];
        }

        if (typeof (ctrlToLoad) === "undefined") {
            loadAppController(routeList["/"]);
        } else {
            loadAppController(ctrlToLoad);
        }
    }

    createSubNav(nav) {
        let isAdmin = false;
        // if ((typeof window.user.idToken.roles !== 'undefined') && (window.user.idToken.roles[0] === "Admin")) {
        //     isAdmin = true;
        // }

        let appNav = document.getElementById('app-nav');
        let ul = document.createElement("ul");
        ul.setAttribute("class", "navbar");
        ul.id = "app-nav-list";
        appNav.appendChild(ul);
        this.buildMenu(nav, ul, isAdmin);

        //let subtoggle = document.getElementsByClassName('sub-toggle');
        //for (let i = 0; i < subtoggle.length; i++) {
        //    subtoggle[i].addEventListener('click', toggleSubnav);
        //}

        //get the navigation links to add eventlistere
        let menuLinks = document.querySelectorAll("a[data-link-for]");
        menuLinks.forEach(menulink => menulink.addEventListener('click', this.menulinkClicked));

    }

    buildMenu(nav, ul, isAdmin) {

        nav.forEach(item => {
            if ((item.role == 'Admin' && isAdmin) || item.role == 'All') {
                let li = document.createElement("li");
                li.setAttribute("class", "nav-item");
                let ahref = document.createElement("A");
                ahref.setAttribute("href", '/'+item.url);
                ahref.setAttribute("data-link-for", window.navList.routes[item.url]);
                let textnode = document.createTextNode(item.name);
                ahref.appendChild(textnode);
                li.appendChild(ahref);
                ul.appendChild(li);
                if (item.hasOwnProperty("subNav")) {
                    ahref.setAttribute("class", "sub-toggle");
                    var ulNew = document.createElement("ul");
                    ulNew.setAttribute("class", "subnav");
                    li.appendChild(ulNew);
                    this.buildMenu(item.subNav, ulNew, isAdmin);
                }
            }
        });

    }

    toggleNav() {
        let navContainer = document.getElementById('app-nav');
        let nav = document.getElementById('app-nav-list');
        
        if(mobileNavToggle) { // close
            console.log('close nav');
            nav.style.display = 'none';
            navContainer.style.overflow = 'hidden';
            mobileNavToggle = false;
        } else { // open
            console.log('open nav');
            nav.style.display = 'block';
            navContainer.style.overflow = 'visible';
            mobileNavToggle = true;
        }
    }

    toggleSubnav(e) {
        e.preventDefault();
        let target = e.target;
        if(window.getComputedStyle(target.nextElementSibling).display == 'none') {
            target.nextElementSibling.style.display='block';
            target.classList.add('subnav-open');
        } else {
            target.nextElementSibling.style.display='none';
            target.classList.remove('subnav-open');
        }
    }

    closeNav() {
        if(this.mobile) {
            let nav = document.getElementById('app-nav-list');
            nav.style.display = 'none';
            this.mobileNavToggle = false;
        }
    }

    menulinkClicked(e) {
        e.preventDefault();
        if (e.target.classList.contains("sub-toggle")) {
            let target = e.target;
            if (window.getComputedStyle(target.nextElementSibling).display == 'none') {
                target.nextElementSibling.style.display = 'block';
                target.classList.add('subnav-open');
            } else {
                target.nextElementSibling.style.display = 'none';
                target.classList.remove('subnav-open');
            }

        } else {
            let contentId = e.target.dataset.linkFor;
            let hrefId = e.target.href;
            loadAppController(contentId);
            //handleURL();
            if (contentId != "#") {
                history.pushState({
                    linkForId: contentId
                }, null, hrefId);
            }
            let subtoggle = document.getElementsByClassName('sub-toggle');
            for (let i = 0; i < subtoggle.length; i++) {
                subtoggle[i].nextElementSibling.style.display = 'none';
                subtoggle[i].classList.remove('subnav-open');
            }
        }
    }

    handleResize(e) {

    }

    init() {
        console.log("uiux init");

        if(window.innerWidth < 480) {
            this.mobile = true;
        }

        //window.addEventListener('resize', handleResize);

        this.mobileNavToggle = false;
        let navToggle = document.getElementById('mobile-nav');
        let subnavToggle = document.getElementsByClassName('sub-toggle');

        for(let i=0; i < subnavToggle.length; i++) {
            subnavToggle[i].addEventListener('click', this.toggleSubnav);
        }

        navToggle.addEventListener('click', this.toggleNav);
    }
}