///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  'dojo/store/Memory',
  'dijit/_WidgetsInTemplateMixin',
  "dijit/form/ComboBox"
],
function(declare, BaseWidgetSetting, Memory, _WidgetsInTemplateMixin, ComboBox) {
 var comboBox;
  return declare([BaseWidgetSetting,_WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-demo-setting',

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);   
       
    },

    setConfig: function(config){
      console.log(config);   
      this.textNode.value = config.configText;
      this.textNode1.value = config.vchuVrstva;   


      var zoznamSet = new Memory({
        data: config.zoznam
    });

      comboBox = new ComboBox({
        id: "textNode2",
        name: "layers",
        store: zoznamSet,
        searchAttr: "name"
    }, this.textNode2)


    comboBox.startup();

    },

    getConfig: function(){
      //WAB will get config object through this method
      return {
        configText: this.textNode.value,
        vchuVrstva: this.textNode1.value,
        testVrstva: comboBox.item.value
      };
    }
  });
});