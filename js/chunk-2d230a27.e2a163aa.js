(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230a27"],{ecb5:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v("Create New List")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[a("v-text-field",{attrs:{label:"New List Name",rules:e.listNameRules,required:""},model:{value:e.listName,callback:function(t){e.listName=t},expression:"listName"}})],1),a("draggable",e._b({staticClass:"list-group",attrs:{handle:".handle",list:e.columns}},"draggable",e.dragOptions,!1),e._l(e.columns,(function(t,l){return a("sidebar-form-row",{key:l,attrs:{column:t,counter:10,index:l},on:{removeColumn:function(t){return e.removeColumn(t)},updateColumnName:function(t){return e.updateColumnName(t)},updateColumnType:function(t){return e.updateColumnType(t)}}})})),1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.addColumn}},[e._v("Add Column")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){return e.$emit("close-dialog")}}},[e._v("Close")]),a("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.createNewList}},[e._v("Create")])],1)],1)],1)},n=[],s=a("310e"),o=a.n(s),r=a("422a"),i={components:{draggable:o.a,SidebarFormRow:r["default"]},data:()=>({columns:[{}],dragOptions:{animation:200,group:"description",disabled:!1,ghostClass:"ghost"},valid:!0,listName:"",listNameRules:[e=>!!e||"Name is required"]}),methods:{addColumn(){this.columns.length<4&&this.columns.push({})},createNewList(){if(this.$refs.form.validate()){let e=this.columns,t=this.listName;this.$store.dispatch("createNewList",{listName:t,columns:e}).then(()=>{this.$emit("close-dialog"),this.$refs.form.reset()})}},updateColumnName(e){this.columns[e.index]["name"]=e.newName},updateColumnType(e){this.columns[e.index]["type"]=e.newType.toLowerCase()},removeColumn(e){this.columns.length>1&&this.columns.splice(e,1)}}},u=i,d=a("2877"),c=a("6544"),m=a.n(c),p=a("8336"),v=a("b0af"),f=a("99d9"),h=a("a523"),C=a("0e8f"),b=a("4bd4"),N=a("a722"),g=a("2fa4"),w=a("8654"),x=Object(d["a"])(u,l,n,!1,null,null,null);t["default"]=x.exports;m()(x,{VBtn:p["a"],VCard:v["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VContainer:h["a"],VFlex:C["a"],VForm:b["a"],VLayout:N["a"],VSpacer:g["a"],VTextField:w["a"]})}}]);
//# sourceMappingURL=chunk-2d230a27.e2a163aa.js.map