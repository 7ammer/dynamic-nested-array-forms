ReactiveForms.createElement({
    template: 'dynamicLayoutArray',
});


ReactiveForms.createFormBlock({
  template: 'myBasicForm',
  submitType: 'normal'
});

ReactiveForms.createElement({
  template: 'inputer',
  validationEvent: 'input'
});



Template.registerHelper('getArrayField', function (index, params) {
    return params.hash.field.replace("$", index);
});


var hero = new SimpleSchema({
    title: {type: String, label:"Title"},
    alignment: {type: String, label:"Alignment"}
});
var billboard = new SimpleSchema({
    title: { type: String, label:"Title"},
    background: { type: String, label:"Background"}
});

var testSchema = new SimpleSchema({
    layout: {type:[Object],label:"layout"},
    'layout.$.compName':{type:String, label: "Comp Name",defaultValue:"hello", allowedValues: ["hero","billboard"]},
    'layout.$.hero':{type:hero, label: "Hero"},
    'layout.$.billboard':{type:billboard, label: "Billboard"},
});

Template.demoForm.helpers({
    getSchema: testSchema,
    getAction: function() {
        return function(els, callbacks, changed) {
            console.log('---------  News Submitted!  ---------', this);
            callbacks.success();
        };
    },
    getData: function(){
        return {
            _id: "9zyANWf8KsTGETyG2",
            title: "Blog",
            layout: [
                {compName:"hero",hero:{title:"Welcome",alignment:"left"}},
                {compName:"billboard",billboard:{title:"Hello people1",background:"blue"}},
                {compName:"billboard",billboard:{title:"Hello people2",background:"lime"}},
                {compName:"hero",hero:{title:"Bye",alignment:"right"}},
        ]};
    }
});

Template.dynamicLayoutArray.helpers({
    rVal: function () {
        console.log("rVal",Template.instance().reactiveForms.newRemoteValue.get());
        return Template.instance().reactiveForms.newRemoteValue.get();
    },
    dynamicTemplateData: function(index){
        return {data: this, index: index};
    }
});

Template.dynamicLayoutArray.events({
    "click [data-add-item]": function(evt){
        var current = Template.instance().reactiveForms.newRemoteValue.get();
        current.push({compName: evt.currentTarget.value});
        Template.instance().reactiveForms.newRemoteValue.set(current);
    },
    "click [data-remove-item]": function(evt, t){
        var current = Template.instance().reactiveForms.newRemoteValue.get();
        current.splice(evt.currentTarget.value, 1);
        Template.instance().reactiveForms.newRemoteValue.set(current);
    }
});
