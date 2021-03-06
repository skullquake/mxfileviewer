define(
	[
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"dijit/_TemplatedMixin",
		"mxui/dom",
		"dojo/dom",
		"dojo/dom-prop",
		"dojo/dom-geometry",
		"dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/text",
		"dojo/html",
		"dojo/_base/event",
		"dojo/request",
		"mxfileviewer/lib/jquery-1.11.2",
		"dojo/text!mxfileviewer/widget/template/mxfileviewer.html"
	],
	function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		dom,
		dojoDom,
		dojoProp,
		dojoGeometry,
		dojoClass,
		dojoStyle,
		dojoConstruct,
		dojoArray,
		lang,
		dojoText,
		dojoHtml,
		dojoEvent,
		request,
		_jQuery,
		widgetTemplate
	){
		"use strict";
		var $ = _jQuery.noConflict(true);
		return declare(
			"mxfileviewer.widget.mxfileviewer",
			[
				_WidgetBase,
				_TemplatedMixin
			],
			{
				templateString: widgetTemplate,
				widgetBase: null,
				_handles: null,
				_contextObj: null,
				constructor:function(){
					this._handles=[];
				},
				postCreate:function(){
					this.domNode.innerHTML='stub'
				},
				update:function(obj,callback){
					this._contextObj=obj;
					this._updateRendering(callback);
				},
				resize:function(box){
				},
				uninitialize:function(){
				},
				_updateRendering:function(callback){
					if(this._contextObj!==null){
						request(
							"/file",
							{
								sync:false,
								timeout:5000,
								method:"GET",
								query:{
									"guid":this._contextObj.getGuid()
								},
								headers:{
								},
								handleAs:"text"
							},

						).then(
							lang.hitch(this,function(data){
								this.domNode.innerHTML=data;
							}),
							lang.hitch(this,function(error){
								this.domNode.innerHTML=error.toString();
							}),
						);
						this.domNode.innerHTML=this._contextObj.getGuid();
						//dojoStyle.set(this.domNode,"display","block");
						//localhost:8080/file?guid=1688849860263937
					}else{
						//dojoStyle.set(this.domNode,"display","none");
						this.domNode.innerHTML="NO CTX";//this._contextObj.getGuid();
					}
					this._executeCallback(callback,"_updateRendering");
				},
				_execMf:function(mf,guid,cb){
					if(mf&&guid){
						mx.ui.action(
							mf,
							{
								params:{
									applyto:"selection",
									guids:[guid]
								},
								callback:lang.hitch(
									this,
									function(objs){
										if(cb&&typeof cb==="function"){
											cb(objs);
										}
									}
								),
								error:function(error){
									console.debug(error.description);
								}
							},
							this
						);
					}
				},
				_executeCallback:function(cb,from){
					if(cb&&typeof cb==="function"){
						cb();
					}
				}
			}
		);
	}
);
require(["mxfileviewer/widget/mxfileviewer"]);
