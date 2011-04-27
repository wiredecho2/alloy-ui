AUI.add("aui-datatable-edit",function(U){var N=U.Lang,aD=U.Array,c=N.isArray,al=N.isBoolean,ah=N.isFunction,v=N.isObject,ao=N.isString,ag=N.String,aw=function(A){return(A instanceof U.BaseCellEditor);},T=U.WidgetStdMod,o=U.getClassName,af="baseCellEditor",i="boundingBox",D="calendar",Q="cancel",Y="celleditor",r="checkboxCellEditor",g="checked",q="columnset",l="contentBox",C="datatable",x="dateCellEditor",S="disk",ai="dropDownCellEditor",L="editable",d="editor",u="element",ab="elementName",aj="field",W="hideOnSave",ad="id",aC="initToolbar",V="initValidator",b="inputFormatter",aB="key",X="label",H="lazySyncUI",J="mousedown",az="mousemove",M="multiple",f="name",am="option",ar="options",k="optionsCellEditor",aA="outputFormatter",P="radioCellEditor",e="recordset",ax="rendered",ae="save",an="selected",aa="selectedAttrName",K="showToolbar",aq="submit",E="textAreaCellEditor",n="textCellEditor",B="toolbar",p="unescapeValue",I="validator",av="value",O="visible",at="wrapper",ay="\n",F="",aF=",",j=/<br\s*\/?>/gi,s=/[\r\n]/g,G=o(Y,u),ap=o(Y,X),y=o(Y,am),m=o(Y,at),t=o(C,L),ak="<br/>";var au=function(){};au.NAME="dataTableCellEditorSupport";au.ATTRS={lazySyncUI:{value:true}};U.mix(au.prototype,{activeColumn:null,activeRecord:null,initializer:function(){var A=this;A.after({columnsetChange:A._afterColumnsetChangeEditor,recordsetChange:A._afterRecordsetChangeEditor,render:A._afterRenderEditor});A.on({cellClick:A._onCellClickEditor,cellMousedown:A._onCellMousedownEditor});},lazySyncUI:function(){var A=this;A.syncEditableColumnsUI();},getRecordColumnValue:function(A,aG){return A.getValue(aG.get(aj));},syncEditableColumnsUI:function(){var A=this;var aG=A.get(q);U.each(aG.idHash,function(aI){var aH=aI.get(d);if(aw(aH)){U.all("[headers="+aI.get(ad)+"]").addClass(t);}});},_afterRenderEditor:function(aG){var A=this;if(A.get(H)){A.get(i).once(az,U.bind(A.lazySyncUI,A));}else{A.lazySyncUI();}if(!A.events){A.plug(U.Plugin.DataTableEvents);}},_afterColumnsetChangeEditor:function(aG){var A=this;A.syncEditableColumnsUI();},_afterRecordsetChangeEditor:function(aG){var A=this;A.syncEditableColumnsUI();},_onCellClickEditor:function(aI){var A=this;var aH=aI.column;var aG=aH.get(d);A.activeColumn=aH;A.activeRecord=aI.record;if(aw(aG)){aG.set(av,A.getRecordColumnValue(aI.record,aH));aG.show().move(aI.liner.getXY());}},_onEditorSave:function(aH){var A=this;var aG=aH.currentTarget;var aI=A.get(e);aG.set(av,aH.newVal);aI.updateRecordDataByKey(A.activeRecord,A.activeColumn.get(aB),aH.newVal);A.set(e,aI);},_onCellMousedownEditor:function(aH){var A=this;var aG=aH.column.get(d);if(aw(aG)&&!aG.get(ax)){aG.on(ae,U.bind(A._onEditorSave,A));aG.render();}}});U.DataTable.CellEditorSupport=au;U.DataTable.Base=U.Base.create("dataTable",U.DataTable.Base,[U.DataTable.CellEditorSupport]);var h=U.Component.create({NAME:af,ATTRS:{elementName:{value:av,validator:ao},footerContent:{value:F},hideOnSave:{value:true,validator:al},inputFormatter:{value:function(A){if(ao(A)){A=A.replace(s,ak);}return A;}},outputFormatter:{value:function(aG){var A=this;if(ao(aG)){if(A.get(p)){aG=ag.unescapeEntities(aG);}aG=aG.replace(j,ay);}return aG;}},showToolbar:{value:true,validator:al},strings:{value:{save:"Save",cancel:"Cancel"}},tabIndex:{value:1},toolbar:{setter:"_setToolbar",validator:v,value:null},unescapeValue:{value:true,validator:al},validator:{setter:"_setValidator",validator:v,value:null},value:{value:F},visible:{value:false}},EXTENDS:U.Overlay,UI_ATTRS:[K,av],prototype:{CONTENT_TEMPLATE:"<form></form>",ELEMENT_TEMPLATE:null,elements:null,validator:null,_hDocMouseDownEv:null,initializer:function(aG){var A=this;A._initEvents();},destructor:function(){var aG=this;var A=aG._hDocMouseDownEv;var aI=aG.toolbar;var aH=aG.validator;if(A){A.detach();}if(aI){aI.destroy();}if(aH){aH.destroy();}},bindUI:function(){var A=this;A.get(i).on(aB,U.bind(A._onEscKey,A),"down:27");},formatValue:function(aG,aH){var A=this;if(ah(aG)){aH=aG.call(A,aH);}return aH;},getValue:function(){var A=this;return A.formatValue(A.get(b),A.getElementsValue());},_initEvents:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn},initValidator:{defaultFn:A._defInitValidatorFn,fireOnce:true},initToolbar:{defaultFn:A._defInitToolbarFn,fireOnce:true},save:{defaultFn:A._defSaveFn}});A.after({render:A._afterRender,visibleChange:U.debounce(A._debounceVisibleChange,350,A)});A.on({"form-validator:submit":U.bind(A._onSubmit,A)});},_afterRender:function(){var A=this;A._handleInitValidatorEvent();A._handleInitToolbarEvent();},_defCancelFn:function(aG){var A=this;A.hide();},_defInitValidatorFn:function(aG){var A=this;A.validator=new U.FormValidator(A.get(I));},_defInitToolbarFn:function(aG){var A=this;A.toolbar=new U.Toolbar(A.get(B)).render(A.footerNode);},_defSaveFn:function(aG){var A=this;if(A.get(W)){A.hide();}},_debounceVisibleChange:function(aH){var aG=this;var A=aG._hDocMouseDownEv;if(aH.newVal){if(!A){aG._hDocMouseDownEv=U.getDoc().on(J,U.bind(aG._onDocMouseDown,aG));}}else{if(A){A.detach();aG._hDocMouseDownEv=null;}}},_handleCancelEvent:function(){var A=this;A.fire(Q);},_handleInitValidatorEvent:function(){var A=this;if(A.get(ax)){this.fire(V);}},_handleInitToolbarEvent:function(){var A=this;if(A.get(ax)&&A.get(K)){this.fire(aC);}},_handleSaveEvent:function(){var A=this;if(!A.validator.hasErrors()){A.fire(ae,{newVal:A.getValue(),prevVal:A.get(av)});}},_onDocMouseDown:function(aH){var A=this;var aG=A.get(i);A.set(O,aG.contains(aH.target));},_onEscKey:function(aG){var A=this;A.hide();},_onSubmit:function(aH){var A=this;var aG=aH.validator;A._handleSaveEvent();if(aG){aG.formEvent.halt();}},_setToolbar:function(aH){var aG=this;var A=aG.getStrings();return U.merge({activeState:false,children:[{label:A[ae],icon:S,type:aq},{handler:U.bind(aG._handleCancelEvent,aG),label:A[Q]}]},aH);},_setValidator:function(aG){var A=this;return U.merge({boundingBox:A.get(l),bubbleTargets:A},aG);},_uiSetShowToolbar:function(aH){var A=this;var aG=A.footerNode;if(aH){aG.show();}else{aG.hide();}A._handleInitToolbarEvent();
},getElementsValue:function(){var A=this;var aG=A.elements;if(aG){return aG.get(av);}return F;},renderUI:function(){var A=this;if(A.ELEMENT_TEMPLATE){A.elements=U.Node.create(A.ELEMENT_TEMPLATE);A._syncElementsName();A.setStdModContent(T.BODY,A.elements);}},_syncElementsName:function(){var A=this;A.elements.setAttribute(f,A.get(ab));},_uiSetValue:function(aH){var A=this;var aG=A.elements;if(aG){aG.val(A.formatValue(A.get(aA),aH));U.later(30,aG,aG.selectText);}}}});U.BaseCellEditor=h;var aE=U.Component.create({NAME:k,ATTRS:{inputFormatter:{value:null},options:{setter:"_setOptions",value:{},validator:v},outputFormatter:{value:null},selectedAttrName:{value:an,validator:ao}},EXTENDS:U.BaseCellEditor,UI_ATTRS:[ar],prototype:{options:null,_createOptions:function(aH){var aL=this;var A=aL.elements;var aJ=[];var aG=[];var aI=aL.OPTION_TEMPLATE;var aM=aL.OPTION_WRAPPER;U.each(aH,function(aQ,aP){var aO={id:U.guid(),label:aQ,name:aP,value:aP};if(aI){aJ.push(U.substitute(aI,aO));}if(aM){aG.push(U.substitute(aM,aO));}});var aN=U.NodeList.create(aJ.join(F));var aK=U.NodeList.create(aG.join(F));if(aK.size()){aK.each(function(aP,aO){aP.prepend(aN.item(aO));});A.setContent(aK);}else{A.setContent(aN);}aL.options=aN;},_getSelectedOptions:function(){var A=this;var aG=[];A.options.each(function(aH){if(aH.get(A.get(aa))){aG.push(aH);}});return U.all(aG);},_setOptions:function(aG){var A={};if(c(aG)){aD.each(aG,function(aH){A[aH]=aH;});}else{if(v(aG)){A=aG;}}return A;},_uiSetOptions:function(aG){var A=this;A._createOptions(aG);A._syncElementsName();},_uiSetValue:function(aH){var A=this;var aG=A.options;if(aG&&aG.size()){aG.set(A.get(aa),false);aD.each(aD(aH),function(aI){aG.filter('[value="'+aI+'"]').set(A.get(aa),true);});}return aH;}}});U.BaseOptionsCellEditor=aE;var Z=U.Component.create({NAME:n,EXTENDS:U.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<input class="'+G+'" type="text" />'}});U.TextCellEditor=Z;var ac=U.Component.create({NAME:E,EXTENDS:U.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<textarea class="'+G+'"></textarea>'}});U.TextAreaCellEditor=ac;var z=U.Component.create({NAME:ai,ATTRS:{multiple:{value:false,validator:al}},EXTENDS:U.BaseOptionsCellEditor,UI_ATTRS:[M],prototype:{ELEMENT_TEMPLATE:'<select class="'+G+'"></select>',OPTION_TEMPLATE:'<option value="{value}">{label}</option>',getElementsValue:function(){var A=this;if(A.get(M)){return A._getSelectedOptions().get(av);}return A.elements.get(av);},_uiSetMultiple:function(aH){var A=this;var aG=A.elements;if(aH){aG.setAttribute(M,M);}else{aG.removeAttribute(M);}}}});U.DropDownCellEditor=z;var R=U.Component.create({NAME:r,ATTRS:{selectedAttrName:{value:g}},EXTENDS:U.BaseOptionsCellEditor,prototype:{ELEMENT_TEMPLATE:'<div class="'+G+'"></div>',OPTION_TEMPLATE:'<input class="'+y+'" id="{id}" name="{name}" type="checkbox" value="{value}"/>',OPTION_WRAPPER:'<label class="'+m+'" for="{id}"><span class="'+ap+'">{label}</span></label>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(av);}}});U.CheckboxCellEditor=R;var w=U.Component.create({NAME:P,EXTENDS:U.CheckboxCellEditor,prototype:{OPTION_TEMPLATE:'<input class="yui3-aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(av)[0];},_syncElementsName:function(){var A=this;var aG=A.options;if(aG){aG.setAttribute(f,A.get(ab));}}}});U.RadioCellEditor=w;var a=U.Component.create({NAME:x,EXTENDS:U.BaseCellEditor,ATTRS:{bodyContent:{value:F},calendar:{setter:"_setCalendar",validator:v,value:null}},prototype:{ELEMENT_TEMPLATE:'<input class="'+G+'" type="hidden" />',initializer:function(){var A=this;A.on("calendar:select",U.bind(A._onDateSelect,A));},getElementsValue:function(){var A=this;return A.calendar.getFormattedSelectedDates().join(aF);},_afterRender:function(){var A=this;U.DateCellEditor.superclass._afterRender.apply(A,arguments);A.calendar=new U.Calendar(A.get(D)).render(A.bodyNode);},_onDateSelect:function(aG){var A=this;A.elements.val(aG.date.formatted.join(aF));},_setCalendar:function(aG){var A=this;return U.merge({bubbleTargets:A},aG);},_uiSetValue:function(aH){var A=this;var aG=A.calendar;if(aG){if(aH&&ao(aH)){aH=aH.split(aF);}A.calendar.set("dates",aH);}}}});U.DateCellEditor=a;},"@VERSION@",{requires:["aui-calendar","aui-datatable-events","aui-toolbar","aui-form-validator","overlay"],skinnable:true});