AUI.add("aui-overlay-base",function(B){B.OverlayBase=B.Base.build("overlay",B.Component,[B.WidgetPosition,B.WidgetStack,B.WidgetPositionAlign,B.WidgetPositionConstrain,B.WidgetStdMod]);},"@VERSION@",{requires:["aui-component","widget-position","widget-stack","widget-position-align","widget-position-constrain","widget-stdmod"]});AUI.add("aui-overlay-context",function(P){var H=P.Lang,N=H.isString,O=H.isNumber,K=H.isObject,J=H.isBoolean,R=function(A){return(A instanceof P.NodeList);},G="align",X="bl",Y="boundingBox",B="cancellableHide",Q="overlaycontext",Z="currentNode",M="focused",W="hide",D="hideDelay",S="hideOn",U="hideOnDocumentClick",I="mousedown",E="show",b="showDelay",V="showOn",a="tl",C="trigger",T="visible";var F=P.Component.create({NAME:Q,ATTRS:{align:{value:{node:null,points:[a,X]}},cancellableHide:{value:true,validator:J},currentNode:{valueFn:function(){return this.get(C).item(0);}},delay:{value:null,validator:K},hideOn:{lazyAdd:false,value:"mouseout",setter:function(A){return this._setHideOn(A);}},hideOnDocumentClick:{lazyAdd:false,setter:function(A){return this._setHideOnDocumentClick(A);},value:true,validator:J},hideDelay:{value:0},showOn:{lazyAdd:false,value:"mouseover",setter:function(A){return this._setShowOn(A);}},showDelay:{value:0,validator:O},trigger:{lazyAdd:false,setter:function(A){if(R(A)){return A;}else{if(N(A)){return P.all(A);}}return new P.NodeList([A]);}},visible:{value:false}},EXTENDS:P.OverlayBase,constructor:function(L){var A=this;A._hideTask=new P.DelayedTask(A.hide,A);A._showTask=new P.DelayedTask(A.show,A);A._showCallback=null;A._hideCallback=null;F.superclass.constructor.apply(this,arguments);},prototype:{bindUI:function(){var A=this;var L=A.get(Y);L.on(I,A._stopTriggerEventPropagation);A.before("triggerChange",A._beforeTriggerChange);A.before("showOnChange",A._beforeShowOnChange);A.before("hideOnChange",A._beforeHideOnChange);A.after("triggerChange",A._afterTriggerChange);A.after("showOnChange",A._afterShowOnChange);A.after("hideOnChange",A._afterHideOnChange);L.on("click",P.bind(A._cancelAutoHide,A));L.on("mouseenter",P.bind(A._cancelAutoHide,A));L.on("mouseleave",P.bind(A._invokeHideTaskOnInteraction,A));A.after("focusedChange",P.bind(A._invokeHideTaskOnInteraction,A));A.on("visibleChange",A._onVisibleChangeOverlayContext);},hide:function(){var A=this;A.clearIntervals();A.fire("hide");F.superclass.hide.apply(A,arguments);},show:function(L){var A=this;A.clearIntervals();A.updateCurrentNode(L);A.fire("show");F.superclass.show.apply(A,arguments);A.refreshAlign();},toggle:function(L){var A=this;if(A.get(T)){A._hideTask.delay(A.get(D),null,null,[L]);}else{A._showTask.delay(A.get(b),null,null,[L]);}},clearIntervals:function(){this._hideTask.cancel();this._showTask.cancel();},refreshAlign:function(){var A=this;var c=A.get(G);var L=A.get(Z);if(L){A._uiSetAlign(L,c.points);}},updateCurrentNode:function(d){var A=this;var f=A.get(G);var L=A.get(C);var e=null;if(d){e=d.currentTarget;}var c=f.node||e||L.item(0);if(c){A.set(Z,c);}},_toggle:function(L){var A=this;var c=L.currentTarget;if(A._lastTarget!=c){A.hide();}A.toggle(L);L.stopPropagation();A._lastTarget=c;},_afterShowOnChange:function(c){var A=this;var d=c.prevVal==A.get(S);if(d){var L=A.get(C);L.detach(c.prevVal,A._hideCallback);A._setHideOn(A.get(S));}},_afterHideOnChange:function(c){var A=this;var d=c.prevVal==A.get(V);if(d){var L=A.get(C);L.detach(c.prevVal,A._showCallback);A._setShowOn(A.get(V));}},_afterTriggerChange:function(L){var A=this;A._setShowOn(A.get(V));A._setHideOn(A.get(S));},_beforeShowOnChange:function(c){var A=this;var L=A.get(C);L.detach(c.prevVal,A._showCallback);},_beforeHideOnChange:function(c){var A=this;var L=A.get(C);L.detach(c.prevVal,A._hideCallback);},_beforeTriggerChange:function(e){var A=this;var d=A.get(C);var L=A.get(V);var c=A.get(S);d.detach(L,A._showCallback);d.detach(c,A._hideCallback);d.detach(I,A._stopTriggerEventPropagation);},_cancelAutoHide:function(L){var A=this;if(A.get(B)){A.clearIntervals();}L.stopPropagation();},_invokeHideTaskOnInteraction:function(c){var L=this;var A=L.get(B);var d=L.get(M);if(!d&&!A){L._hideTask.delay(L.get(D));}},_onVisibleChangeOverlayContext:function(L){var A=this;if(L.newVal&&A.get("disabled")){L.preventDefault();}},_stopTriggerEventPropagation:function(A){A.stopPropagation();},_setHideOn:function(e){var L=this;var d=L.get(C);var A=e==L.get(V);if(A){L._hideCallback=P.bind(L._toggle,L);d.detach(e,L._showCallback);}else{var c=L.get(D);L._hideCallback=function(f){L._hideTask.delay(c,null,null,[f]);f.stopPropagation();};}d.on(e,L._hideCallback);return e;},_setHideOnDocumentClick:function(L){var A=this;if(L){P.OverlayContextManager.register(A);}else{P.OverlayContextManager.remove(A);}return L;},_setShowOn:function(e){var L=this;var d=L.get(C);var A=e==L.get(S);if(A){L._showCallback=P.bind(L._toggle,L);d.detach(e,L._hideCallback);}else{var c=L.get(b);L._showCallback=function(f){L._showTask.delay(c,null,null,[f]);f.stopPropagation();};}if(e!=I){d.on(I,L._stopTriggerEventPropagation);}else{d.detach(I,L._stopTriggerEventPropagation);}d.on(e,L._showCallback);return e;}}});P.OverlayContext=F;P.OverlayContextManager=new P.OverlayManager({});P.on(I,function(){P.OverlayContextManager.hideAll();},P.getDoc());},"@VERSION@",{requires:["aui-overlay-manager","aui-delayed-task"]});AUI.add("aui-overlay-context-panel",function(N){var I=N.Lang,e=I.isBoolean,J=I.isString,h=I.isObject,t="align",C="anim",g="arrow",K="backgroundColor",P="",p="boundingBox",i="click",Y="contentBox",u="overlaycontextpanel",k="default",T=".",m="end",n="hidden",d="inner",Q="opacity",q="pointer",D="showArrow",F="state",r="style",s="visible",j="bc",f="bl",b="br",R="cc",V="lb",U="lc",O="lt",Z="rb",X="rc",S="rl",G=N.ClassNameManager.getClassName,M=G(u),l=G(u,g,P),o=G(u,n),a=G(u,q),H=G(u,q,d),W=G(F,k),B='<div class="'+[W,a].join(" ")+'"></div>',c='<div class="'+H+'"></div>';var E=N.Component.create({NAME:u,ATTRS:{anim:{lazyAdd:false,value:{show:false},setter:function(A){return this._setAnim(A);
}},arrow:{value:null,validator:J},hideOn:{value:i},showOn:{value:i},showArrow:{lazyAdd:false,value:true,validator:e},stack:{lazyAdd:false,value:true,setter:function(A){return this._setStack(A);},validator:e}},EXTENDS:N.OverlayContext,prototype:{bindUI:function(){var A=this;A.after("showArrowChange",A._afterShowArrowChange);A.before("show",A._beforeShow);E.superclass.bindUI.apply(A,arguments);},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;A._syncElements();},align:function(v,L){var A=this;E.superclass.align.apply(this,arguments);A._syncElements();},fixPointerColor:function(){var L=this;var v=L.get(Y);var AA=v.one(T+H);AA.removeAttribute(r);var A=v.getStyle(K);var x="borderBottomColor";var y=[T+l+Z,T+l+X,T+l+S].join(",");var w=[T+l+b,T+l+j,T+l+f].join(",");var z=[T+l+V,T+l+U,T+l+O].join(",");if(v.test(y)){x="borderLeftColor";}else{if(v.test(w)){x="borderTopColor";}else{if(v.test(z)){x="borderRightColor";}}}AA.setStyle(x,A);},getAlignPoint:function(){var A=this;var L=A.get(t).points[0];if(L==R){L=j;}return A.get(g)||L;},hide:function(v){var A=this;var L=A.get(p);if(A._hideAnim){var w=A.get(s);if(w){A._hideAnim.run();A._hideAnim.on(m,function(){E.superclass.hide.apply(A,arguments);});}}else{E.superclass.hide.apply(A,arguments);}},_renderElements:function(){var A=this;var L=A.get(Y);var w=A.get(t);var v=w.points[0];L.addClass(W);A._pointerNode=N.Node.create(B).append(c);L.append(A._pointerNode);},_syncElements:function(){var A=this;var v=A.get(Y);var L=A._pointerNode;var w=A.getAlignPoint();if(A.get(D)){L.removeClass(o);v.removeClass(l+A._lastOverlayPoint);v.addClass(l+w);A.fixPointerColor();}else{L.addClass(o);}A._lastOverlayPoint=w;},_setStack:function(L){var A=this;if(L){N.OverlayContextPanelManager.register(A);}else{N.OverlayContextPanelManager.remove(A);}return L;},_setAnim:function(x){var A=this;var L=A.get(p);if(x){var y={node:L,duration:0.1};var v=N.merge(y,{from:{opacity:0},to:{opacity:1}});var w=N.merge(y,{from:{opacity:1},to:{opacity:0}});if(h(x)){v=N.merge(v,x.show);w=N.merge(w,x.hide);}A._showAnim=new N.Anim(v);A._hideAnim=new N.Anim(w);if(h(x)){if(x.show===false){A._showAnim=null;}if(x.hide===false){A._hideAnim=null;}}}return x;},_beforeShow:function(v){var A=this;var L=A.get(p);var w=A.get(s);if(!w&&A._showAnim){L.setStyle(Q,0);A._showAnim.run();}else{L.setStyle(Q,1);}},_afterShowArrowChange:function(){var A=this;A._syncElements();}}});N.OverlayContextPanel=E;N.OverlayContextPanelManager=new N.OverlayManager({zIndexBase:1000});},"@VERSION@",{requires:["aui-overlay-context","anim"],skinnable:true});AUI.add("aui-overlay-manager",function(D){var J=D.Lang,K=J.isArray,C=J.isBoolean,O=J.isNumber,B=J.isString,M="boundingBox",G="default",N="host",I="OverlayManager",L="group",E="zIndex",H="zIndexBase";var F=D.Component.create({NAME:I.toLowerCase(),ATTRS:{zIndexBase:{value:1000,validator:O,setter:function(A){return parseInt(A,10);}}},EXTENDS:D.Base,prototype:{initializer:function(){var A=this;A._overlays=[];},bringToTop:function(P){var A=this;var R=A._overlays.sort(A.sortByZIndexDesc);var T=R[0];if(T!==P){var S=P.get(E);var Q=T.get(E);P.set(E,Q+1);P.set("focused",true);}},destructor:function(){var A=this;A._overlays=[];},register:function(S){var P=this;var T=P._overlays;if(K(S)){D.Array.each(S,function(W){P.register(W);});}else{var R=P.get(H);var V=P._registered(S);if(!V&&S&&((S instanceof D.Overlay)||(D.Component&&S instanceof D.Component))){var Q=S.get(M);T.push(S);var U=S.get(E)||0;var A=T.length+U+R;S.set(E,A);S.on("focusedChange",P._onFocusedChange,P);Q.on("mousedown",P._onMouseDown,P);}}return T;},remove:function(P){var A=this;var Q=A._overlays;if(Q.length){return D.Array.removeItem(Q,P);}return null;},each:function(Q){var A=this;var P=A._overlays;D.Array.each(P,Q);},showAll:function(){this.each(function(A){A.show();});},hideAll:function(){this.each(function(A){A.hide();});},sortByZIndexDesc:function(P,A){if(!P||!A||!P.hasImpl(D.WidgetStack)||!A.hasImpl(D.WidgetStack)){return 0;}else{var Q=P.get(E);var R=A.get(E);if(Q>R){return -1;}else{if(Q<R){return 1;}else{return 0;}}}},_registered:function(P){var A=this;return D.Array.indexOf(A._overlays,P)!=-1;},_onMouseDown:function(Q){var A=this;var P=D.Widget.getByNode(Q.currentTarget||Q.target);var R=A._registered(P);if(P&&R){A.bringToTop(P);}},_onFocusedChange:function(Q){var A=this;if(Q.newVal){var P=Q.currentTarget||Q.target;var R=A._registered(P);if(P&&R){A.bringToTop(P);}}}}});D.OverlayManager=F;},"@VERSION@",{requires:["aui-base","aui-overlay-base","overlay","plugin"]});AUI.add("aui-overlay-mask",function(P){var F=P.Lang,I=F.isArray,J=F.isString,M=F.isNumber,U=F.isValue,Z=P.config,N=P.UA,R=(N.ie&&N.version.major<=6),Y="absolute",E="alignPoints",W="background",X="boundingBox",K="contentBox",T="fixed",Q="height",B="offsetHeight",G="offsetWidth",S="opacity",V="overlaymask",O="position",H="target",C="width";var D=P.Component.create({NAME:V,ATTRS:{alignPoints:{value:["tl","tl"],validator:I},background:{lazyAdd:false,value:null,validator:J,setter:function(A){if(A){this.get(K).setStyle(W,A);}return A;}},target:{lazyAdd:false,value:Z.doc,setter:function(L){var A=this;var e=Z.doc;var d=Z.doc;var c=P.one(L);var b=A._isDoc=(d.HTMLDocument&&L instanceof d.HTMLDocument)||c.compareTo(e);var a=A._isWin=c.compareTo(d);A._fullPage=b||a;return c;}},opacity:{value:0.5,validator:M,setter:function(A){return this._setOpacity(A);}},shim:{value:P.UA.ie},visible:{value:false},zIndex:{value:1000}},EXTENDS:P.OverlayBase,prototype:{bindUI:function(){var A=this;D.superclass.bindUI.apply(this,arguments);A.after("targetChange",A._afterTargetChange);A.after("visibleChange",A._afterVisibleChange);P.on("windowresize",P.bind(A.refreshMask,A));},syncUI:function(){var A=this;A.refreshMask();},getTargetSize:function(){var L=this;var d=L.get(H);var b=L._isDoc;var a=L._isWin;var A=d.get(B);var c=d.get(G);if(R){if(a){c=P.DOM.winWidth();A=P.DOM.winHeight();}else{if(b){c=P.DOM.docWidth();A=P.DOM.docHeight();}}}else{if(L._fullPage){A="100%";
c="100%";}}return{height:A,width:c};},refreshMask:function(){var L=this;var f=L.get(E);var e=L.get(H);var b=L.get(X);var d=L.getTargetSize();var a=L._fullPage;b.setStyles({position:(R||!a)?Y:T,left:0,top:0});var A=d.height;var c=d.width;if(U(A)){L.set(Q,A);}if(U(c)){L.set(C,c);}if(!a){L.align(e,f);}},_setOpacity:function(L){var A=this;A.get(K).setStyle(S,L);return L;},_uiSetVisible:function(L){var A=this;D.superclass._uiSetVisible.apply(this,arguments);if(L){A._setOpacity(A.get(S));}},_afterTargetChange:function(L){var A=this;A.refreshMask();},_afterVisibleChange:function(L){var A=this;A._uiSetVisible(L.newVal);},_uiSetXY:function(){var A=this;if(!A._fullPage||R){D.superclass._uiSetXY.apply(A,arguments);}}}});P.OverlayMask=D;},"@VERSION@",{requires:["aui-base","aui-overlay-base","event-resize"],skinnable:true});AUI.add("aui-overlay",function(B){},"@VERSION@",{skinnable:true,use:["aui-overlay-base","aui-overlay-context","aui-overlay-context-panel","aui-overlay-manager","aui-overlay-mask"]});