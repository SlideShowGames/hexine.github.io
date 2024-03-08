var Path={DEFAULT_BAG_SPACE:10,_STORES_OFFSET:0,Weight:{"bone spear":2,"iron sword":3,"steel sword":5,rifle:5,bullets:.1,"energy cell":.2,"laser rifle":5,"plasma rifle":5,bolas:.5},name:"Path",options:{},init:function(t){this.options=$.extend(this.options,t),World.init(),this.tab=Header.addLocation(_("A Dusty Path"),"path",Path),this.panel=$("<div>").attr("id","pathPanel").addClass("location").appendTo("div#locationSlider"),this.scroller=$("<div>").attr("id","pathScroller").appendTo(this.panel);var e=$("<div>").attr({id:"outfitting","data-legend":_("supplies:")}).appendTo(this.scroller);$("<div>").attr("id","bagspace").appendTo(e),new Button.Button({id:"embarkButton",text:_("embark"),click:Path.embark,width:"80px",cooldown:World.DEATH_COOLDOWN}).appendTo(this.scroller),Path.outfit=$SM.get("outfit"),Engine.updateSlider(),$.Dispatch("stateUpdate").subscribe(Path.handleStateUpdates)},openPath:function(){Path.init(),Engine.event("progress","path"),Notifications.notify(Room,_("the compass points "+World.dir))},getWeight:function(t){var e=Path.Weight[t];return"number"!=typeof e&&(e=1),e},getCapacity:function(){return $SM.get('stores["cargo drone"]',!0)>0?Path.DEFAULT_BAG_SPACE+100:$SM.get("stores.convoy",!0)>0?Path.DEFAULT_BAG_SPACE+60:$SM.get("stores.wagon",!0)>0?Path.DEFAULT_BAG_SPACE+30:$SM.get("stores.rucksack",!0)>0?Path.DEFAULT_BAG_SPACE+10:Path.DEFAULT_BAG_SPACE},getFreeSpace:function(){var t=0;if(Path.outfit)for(var e in Path.outfit){var a=Path.outfit[e];isNaN(a)&&(Path.outfit[e]=a=0),t+=a*Path.getWeight(e)}return Path.getCapacity()-t},updatePerks:function(t){if($SM.get("character.perks")){var e=$("#perks"),a=!1;for(var o in 0===e.length&&(a=!0,e=$("<div>").attr({id:"perks","data-legend":_("perks")})),$SM.get("character.perks")){var i="perk_"+o.replace(" ","-"),d=$("#"+i);$SM.get('character.perks["'+o+'"]')&&0===d.length&&(d=$("<div>").attr("id",i).addClass("perkRow").appendTo(e),$("<div>").addClass("row_key").text(_(o)).appendTo(d),$("<div>").addClass("tooltip bottom right").text(Engine.Perks[o].desc).appendTo(d))}a&&e.children().length>0&&e.prependTo(Path.panel),t||Engine.activeModule!==Path||$("#storesContainer").css({top:e.height()+26+Path._STORES_OFFSET+"px"})}},updateOutfitting:function(){var t=$("div#outfitting");Path.outfit||(Path.outfit={});var e=_("none");$SM.get('stores["kinetic armour"]',!0)>0?e=_("kinetic"):$SM.get('stores["s armour"]',!0)>0?e=_("steel"):$SM.get('stores["i armour"]',!0)>0?e=_("iron"):$SM.get('stores["l armour"]',!0)>0&&(e=_("leather"));var a=$("#armourRow");0===a.length?(a=$("<div>").attr("id","armourRow").addClass("outfitRow").prependTo(t),$("<div>").addClass("row_key").text(_("armour")).appendTo(a),$("<div>").addClass("row_val").text(e).appendTo(a),$("<div>").addClass("clear").appendTo(a)):$(".row_val",a).text(e);var o=$("#waterRow");0===o.length?(o=$("<div>").attr("id","waterRow").addClass("outfitRow").insertAfter(a),$("<div>").addClass("row_key").text(_("water")).appendTo(o),$("<div>").addClass("row_val").text(World.getMaxWater()).appendTo(o),$("<div>").addClass("clear").appendTo(o)):$(".row_val",o).text(World.getMaxWater());var i=Path.getFreeSpace(),d=0,r=$.extend({"cured meat":{type:"tool",desc:_("restores")+" "+World.MEAT_HEAL+" "+_("hp")},bullets:{type:"tool",desc:_("use with rifle")},grenade:{type:"weapon"},bolas:{type:"weapon"},"laser rifle":{type:"weapon"},"energy cell":{type:"tool",desc:_("emits a soft red glow")},bayonet:{type:"weapon"},charm:{type:"tool"},"alien alloy":{type:"tool"},medicine:{type:"tool",desc:_("restores")+" "+World.MEDS_HEAL+" "+_("hp")}},Room.Craftables,Fabricator.Craftables);for(var n in r){var s=_(n),l=r[n],p=$SM.get('stores["'+n+'"]'),u=Path.outfit[n];u="number"==typeof u?u:0,void 0!==p&&(p<u&&(u=p),$SM.set(n,u,!0));var h=$("div#outfit_row_"+n.replace(" ","-"),t);if(("tool"==l.type||"weapon"==l.type)&&p>0){if(d+=u*Path.getWeight(n),0===h.length){h=Path.createOutfittingRow(n,u,l,l.name);var c=null;t.children().each((function(t){var e=$(this);0===e.attr("id").indexOf("outfit_row_")&&(e.children(".row_key").text()<s&&(c=e.attr("id")))})),null==c?h.insertAfter(o):h.insertAfter(t.find("#"+c))}else $("div#"+h.attr("id")+" > div.row_val > span",t).text(u),$("div#"+h.attr("id")+" .tooltip .numAvailable",t).text(p-u);0===u?($(".dnBtn",h).addClass("disabled"),$(".dnManyBtn",h).addClass("disabled")):($(".dnBtn",h).removeClass("disabled"),$(".dnManyBtn",h).removeClass("disabled")),u==p||i<Path.getWeight(n)?($(".upBtn",h).addClass("disabled"),$(".upManyBtn",h).addClass("disabled")):($(".upBtn",h).removeClass("disabled"),$(".upManyBtn",h).removeClass("disabled"))}else 0===p&&h.length>0&&h.remove()}Path.updateBagSpace(d)},updateBagSpace:function(t){$("#bagspace").text(_("free {0}/{1}",Math.floor(Path.getCapacity()-t),Path.getCapacity())),Path.outfit["cured meat"]>0?Button.setDisabled($("#embarkButton"),!1):Button.setDisabled($("#embarkButton"),!0)},createOutfittingRow:function(t,e,a){a.name||(a.name=_(t));var o=$("<div>").attr("id","outfit_row_"+t.replace(" ","-")).addClass("outfitRow").attr("key",t);$("<div>").addClass("row_key").text(a.name).appendTo(o);var i=$("<div>").addClass("row_val").appendTo(o);$("<span>").text(e).appendTo(i),$("<div>").addClass("upBtn").appendTo(i).click([1],Path.increaseSupply),$("<div>").addClass("dnBtn").appendTo(i).click([1],Path.decreaseSupply),$("<div>").addClass("upManyBtn").appendTo(i).click([10],Path.increaseSupply),$("<div>").addClass("dnManyBtn").appendTo(i).click([10],Path.decreaseSupply),$("<div>").addClass("clear").appendTo(o);var d=$SM.get('stores["'+t+'"]',!0),r=$("<div>").addClass("tooltip bottom right").appendTo(o);return"weapon"==a.type?($("<div>").addClass("row_key").text(_("damage")).appendTo(r),$("<div>").addClass("row_val").text(World.getDamage(t)).appendTo(r)):"tool"==a.type&&"undefined"!=a.desc&&$("<div>").addClass("row_key").text(a.desc).appendTo(r),$("<div>").addClass("row_key").text(_("weight")).appendTo(r),$("<div>").addClass("row_val").text(Path.getWeight(t)).appendTo(r),$("<div>").addClass("row_key").text(_("available")).appendTo(r),$("<div>").addClass("row_val").addClass("numAvailable").text(d).appendTo(r),o},increaseSupply:function(t){var e=$(this).closest(".outfitRow").attr("key");Engine.log("increasing "+e+" by up to "+t.data);var a=Path.outfit[e];if(a="number"==typeof a?a:0,Path.getFreeSpace()>=Path.getWeight(e)&&a<$SM.get('stores["'+e+'"]',!0)){var o=Math.floor(Path.getFreeSpace()/Path.getWeight(e)),i=$SM.get('stores["'+e+'"]',!0)-a;Path.outfit[e]=a+Math.min(t.data,o,i),$SM.set("outfit["+e+"]",Path.outfit[e]),Path.updateOutfitting()}},decreaseSupply:function(t){var e=$(this).closest(".outfitRow").attr("key");Engine.log("decreasing "+e+" by up to "+t.data);var a=Path.outfit[e];(a="number"==typeof a?a:0)>0&&(Path.outfit[e]=Math.max(0,a-t.data),$SM.set("outfit["+e+"]",Path.outfit[e]),Path.updateOutfitting())},onArrival:function(t){Path.setTitle(),Path.updateOutfitting(),Path.updatePerks(!0),AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_DUSTY_PATH),Engine.moveStoresView($("#perks"),t)},setTitle:function(){document.title=_("A Dusty Path")},embark:function(){for(var t in Path.outfit)$SM.add('stores["'+t+'"]',-Path.outfit[t]);World.onArrival(),$("#outerSlider").animate({left:"-700px"},300),Engine.activeModule=World,AudioEngine.playSound(AudioLibrary.EMBARK)},handleStateUpdates:function(t){"character"==t.category&&0===t.stateName.indexOf("character.perks")&&Engine.activeModule==Path?Path.updatePerks():"income"==t.category&&Engine.activeModule==Path&&Path.updateOutfitting()}};