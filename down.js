//A System for tracking Downtime Activities
//Made by Julexar (https://app.roll20.net/users/9989180/julexar)

//API Commands:
/* !down - will give you the menu
    --Options--
    --sel - use the selected character token
    --name - use the character name
    --charid - use the character id
*/

var Downtime = Downtime || (function(){
    'use strict';
    
    var version='0.9e',
    
    setDefaults = function() {
        state.down = {
            now: {
                time: 0,
                type: "Week",
                substr: "s",
                dc: 0,
                crimeval: 0,
                train: "",
                potion: "",
                item: "",
                minprice: 10,
                maxprice: 1000,
            }
        };
    },

    setItemList = function() {
        state.List = {
            common: {
                weapon: [
                    //Common Weapons
                    {
                        desc: "Club (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 5 ft.",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Range: 5 ft.",
                        properties: "Finesse, Light",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft.",
                        properties: "Light",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Javelin (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 5 ft.",
                        properties: "",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 5 ft.",
                        properties: "Light",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 5 ft.",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft.",
                        properties: "Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Range: 5 ft.",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft.",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Longsword (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Range: 5 ft.",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft.",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Rapier (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft.",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft.",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 5 ft.",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 5 ft.",
                        properties: "Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft.",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (common), requires attunement by a Warforged<br><br>An Armblade is a magic weapon that attaches to your arm, becoming inseperable from you as long as you\'re attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.<br><br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can\'t use that hand for other purposes.",
                        name: "Armblade (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 10 ft.",
                        properties: "Finesse, Reach",
                        price: 2,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (common)<br><br>In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
                        name: "Moon-Touched Shortsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 5 ft.",
                        properties: "Finesse, Light",
                        amount: 1,
                        price: 10,
                        weight: 2
                    },
                    {
                        desc: "Scimitar (common)<br><br>In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
                        name: "Moon-Touched Scimitar",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft.",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Longsword (common)<br><br>In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
                        name: "Moon-Touched Longsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft.",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (common)<br><br>In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
                        name: "Moon-Touched Greatsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "This arrow can\'t be broken, except when it is within an Antimagic Field.",
                        name: "Unbreakable Arrow",
                        modifiers: "Item Type: Ammunition",
                        properties: "",
                        price: 1,
                        amount: 20,
                        weight: 1
                    },
                    {
                        desc: "Arrows (common)<br><br>This ammunition packs a wallop. A creature hit by the ammunition must succeed on a DC 10 Strength saving throw or be knocked prone.",
                        name: "Walloping Arrows",
                        modifiers: "Item Type: Ammunition",
                        properties: "",
                        price: 1,
                        amount: 20,
                        weight: 1
                    },
                    {
                        desc: "Crossbow bolts (common)<br><br>This ammunition packs a wallop. A creature hit by the ammunition must succeed on a DC 10 Strength saving throw or be knocked prone.",
                        name: "Walloping Crossbow bolts",
                        modifiers: "Item Type: Ammunition",
                        properties: "",
                        price: 1,
                        amount: 20,
                        weight: 1.5
                    },
                    {
                        desc: "Blowgun needles (common)<br><br>This ammunition packs a wallop. A creature hit by the ammunition must succeed on a DC 10 Strength saving throw or be knocked prone.",
                        name: "Walloping Blowgun needles",
                        modifiers: "Item Type: Ammunition",
                        properties: "",
                        price: 1,
                        amount: 50,
                        weight: 1
                    },
                    {
                        desc: "Sling bullets (common)<br><br>This ammunition packs a wallop. A creature hit by the ammunition must succeed on a DC 10 Strength saving throw or be knocked prone.",
                        name: "Walloping Sling bullets",
                        modifiers: "Item Type: Ammunition",
                        properties: "",
                        price: 0.04,
                        amount: 20,
                        weight: 1.5
                    }
                ],
                armor: [
                    //Common Armor
                    {
                        desc: "Hide Armor (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Hide)",
                        modifiers: "Item Type: Medium Armor, AC: 12",
                        properties: "",
                        price: 10,
                        amount: 1,
                        weight: 12
                    },
                    {
                        desc: "Chain Shirt (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Chain Shirt)",
                        modifiers: "Item Type: Medium Armor, AC: 13",
                        properties: "",
                        price: 50,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Scale Mail (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Scale Mail)",
                        modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 50,
                        weight: 45,
                        amount: 1
                    },
                    {
                        desc: "Breastplate (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Breastplate)",
                        modifiers: "Item Type: Medium Armor, AC: 14",
                        properties: "",
                        price: 400,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Half Plate (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Half Plate)",
                        modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
                        properties: "",
                        price: 750,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Ring Mail (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Ring Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 30,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Chain Mail (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Chain Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
                        properties: "Strength score 13 or higher required, if below, Speed -10",
                        price: 75,
                        weight: 55,
                        amount: 1
                    },
                    {
                        desc: "Splint Mail (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Splint Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
                        price: 200,
                        weight: 60,
                        amount: 1
                    },
                    {
                        desc: "Plate (common)<br><br>This armor never gets dirty.",
                        name: "Armor of Gleaming (Plate)",
                        modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
                        price: 1500,
                        weight: 65,
                        amount: 1
                    },
                    {
                        desc: "Padded Armor (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Padded)",
                        modifiers: "Item Type: Light Armor, AC: 11, Stealth:Disadvantage",
                        properties: "",
                        price: 5,
                        amount: 1,
                        weight: 8
                    },
                    {
                        desc: "Leather Armor (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Leather)",
                        modifiers: "Item Type: Light Armor, AC: 11",
                        properties: "",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Studded Leather (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Studded Leather)",
                        modifiers: "Item Type: Light Armor, AC: 12",
                        properties: "",
                        price: 45,
                        weight: 13,
                        amount: 1
                    },
                    {
                        desc: "Hide Armor (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Hide)",
                        modifiers: "Item Type: Medium Armor, AC: 12",
                        properties: "",
                        price: 10,
                        weight: 12,
                        amount: 1
                    },
                    {
                        desc: "Chain Shirt (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Chain Shirt)",
                        modifiers: "Item Type: Medium Armor, AC: 13",
                        properties: "",
                        price: 50,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Scale Mail (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Scale Mail)",
                        modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 50,
                        weight: 45,
                        amount: 1
                    },
                    {
                        desc: "Breastplate (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Breastplate)",
                        modifiers: "Item Type: Medium Armor, AC: 14",
                        properties: "",
                        price: 400,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Half Plate (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Half Plate)",
                        modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
                        properties: "",
                        price: 750,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Ring Mail (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Ring Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 30,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Chain Mail (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Chain Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
                        properties: "",
                        price: 75,
                        weight: 55,
                        amount: 1
                    },
                    {
                        desc: "Splint Mail (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Splint Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
                        properties: "",
                        price: 200,
                        weight: 60,
                        amount: 1
                    },
                    {
                        desc: "Plate (common)<br><br>You can doff this armor as an action",
                        name: "Cast-Off Armor (Plate)",
                        modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
                        properties: "",
                        price: 1500,
                        weight: 65,
                        amount: 1
                    },
                    {
                        desc: "Shield (common)<br><br>The front of this shield is shaped in the likeness of a face. While bearing the shield, you can use a bonus action to alter the face\'s expression.",
                        name: "Shield of Expression",
                        modifiers: "Item Type: Shield, AC +2",
                        properties: "",
                        weight: 6,
                        price: 10,
                        amount: 1,
                    },
                    {
                        desc: "Padded Armor (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Padded)",
                        modifiers: "Item Type: Light Armor, AC: 11, Stealth:Disadvantage",
                        properties: "",
                        price: 5,
                        amount: 1,
                        weight: 8
                    },
                    {
                        desc: "Leather Armor (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Leather)",
                        modifiers: "Item Type: Light Armor, AC: 11",
                        properties: "",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Studded Leather (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Studded Leather)",
                        modifiers: "Item Type: Light Armor, AC: 12",
                        properties: "",
                        price: 45,
                        weight: 13,
                        amount: 1
                    },
                    {
                        desc: "Hide Armor (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Hide)",
                        modifiers: "Item Type: Medium Armor, AC: 12",
                        properties: "",
                        price: 10,
                        weight: 12,
                        amount: 1
                    },
                    {
                        desc: "Chain Shirt (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Chain Shirt)",
                        modifiers: "Item Type: Medium Armor, AC: 13",
                        properties: "",
                        price: 50,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Scale Mail (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Scale Mail)",
                        modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 50,
                        weight: 45,
                        amount: 1
                    },
                    {
                        desc: "Breastplate (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Breastplate)",
                        modifiers: "Item Type: Medium Armor, AC: 14",
                        properties: "",
                        price: 400,
                        weight: 20,
                        amount: 1
                    },
                    {
                        desc: "Half Plate (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Half Plate)",
                        modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
                        properties: "",
                        price: 750,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Ring Mail (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Ring Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
                        properties: "",
                        price: 30,
                        weight: 40,
                        amount: 1
                    },
                    {
                        desc: "Chain Mail (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Chain Mail)",
                        modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
                        properties: "",
                        price: 75,
                        weight: 55,
                        amount: 1
                    },
                    {
                        desc: "Splint Mail (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Splint Mail)",
                        modifiers: "Item Type: Heavy Armor, AC 17, Stealth:Disadvantage",
                        properties: "",
                        price: 200,
                        weight: 60,
                        amount: 1
                    },
                    {
                        desc: "Plate (common)<br><br>Wisps of harmless, odorless smoke rise from this armor while it is worn.",
                        name: "Smoldering Armor (Plate)",
                        modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
                        properties: "",
                        price: 1500,
                        weight: 65,
                        amount: 1
                    }
                ],
                accessoires: [
                    //Common Accessoires (Rings, Rods, Staffs, Wearables)
                ],
                scroll: [
                    //Common Scrolls    
                ],
                misc: [
                    //Common misc Items (edibles & other things that don't belong in previous categories)
                ]
            },
            uncommon: {
                weapon: [
                    //Uncommon Weapons
                    {
                        desc: "Arrows (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Arrows +1",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +1, Ranged Damage +1",
                        properties: "",
                        price: 1,
                        amount: 20,
                        weight: 0.05
                    },
                    {
                        desc: "Crossbow bolts (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Crossbow bolts +1",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +1, Ranged Damage +1",
                        properties: "",
                        price: 1,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Blowgun needles (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Blowgun needles +1",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +1, Ranged Damage +1",
                        properties: "",
                        price: 1,
                        weight: 0.02,
                        amount: 50
                    },
                    {
                        desc: "Sling bullets (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Sling bullets +1",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +1, Ranged Damage +1",
                        properties: "",
                        price: 0.04,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Club (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Light",
                        price: 0.1,
                        amount: 1,
                        weight: 2
                    },
                    {
                        desc: "Dagger (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Javelin (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 80/320",
                        properties: "Ammunition, Two-Handed",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s brath, Range: 5 ft., Alternate Damage: 1d10, Alternate Damage Type: slashing",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "",
                        price: 10,
                        weight: 2,
                        ammount: 1
                    },
                    {
                        desc: "Glaive (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 10 ft.",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: slashing",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 20/60, Alternate Damage: 1d8, Alternate Damage Type: piercing",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 10 ft",
                        properties: "Finesse, Reach",
                        price: 2,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (uncommon), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>Whenever you roll a 20 on your attack roll with this weapon, each creature of your choice within 5 feet of the target takes 5 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Slumbering Dragon\'s Wrath Weapon (Net)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 0, Secondary Damage: 5, Secondary Damage Type: dragon\'s breath, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.<br><br>The javelin\'s property can\'t be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.",
                        name: "Javelin of Lightning",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 4d6, Secondary Damage Type: lightning, Range: 30/120",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sickle (uncommon), requires attunement by a Druid or Ranger<br><br>This silver-bladed sickle glimmers softly with moonlight. While holding this magic weapon, you gain a bonus to attack and damage rolls made with it, and you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells. The bonus is determined by the weapon\'s rarity. In addition, you can use the sickle as a spellcasting focus for your druid and ranger spells.<br><br>When you cast a spell that restores hit points, you can roll a d4 and add the number rolled to the amount of hit points restored, provided you are holding the sickle.",
                        name: "Moon Sickle +1",
                        modifiers: "Item Type: Weapon (sickle), Damage: 1d4, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Spell Attack +1, Spell DC +1",
                        properties: "Light",
                        weight: 2,
                        price: 1,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (uncommon), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>Curse. This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one.<br><br>In addition, while the sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.<br><br>You can break the curse in the usual ways. Alternatively, casting Banishment on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.",
                        name: "Sword of Vengeance (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 5 ft, Melee Attacks +1, Melee Damage +1",
                        properties: "Finesse, Light",
                        price: 10,
                        amount: 1,
                        weight: 2
                    },
                    {
                        desc: "Scimitar (uncommon), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>Curse. This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one.<br><br>In addition, while the sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.<br><br>You can break the curse in the usual ways. Alternatively, casting Banishment on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.",
                        name: "Sword of Vengeance (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft, Melee Attacks +1, Melee Damage +1",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (uncommon), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>Curse. This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one.<br><br>In addition, while the sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.<br><br>You can break the curse in the usual ways. Alternatively, casting Banishment on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.",
                        name: "Sword of Vengeance (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft, Melee Attacks +1, Melee Damage +1",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Longsword (uncommon), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>Curse. This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one.<br><br>In addition, while the sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.<br><br>You can break the curse in the usual ways. Alternatively, casting Banishment on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.",
                        name: "Sword of Vengeance (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Range 5 ft, Melee Attacks +1, Melee Damage +1, Alternate Damage: 1d10, Alternate Damage Type: slashing",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (uncommon), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>Curse. This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attuned to this weapon, you have disadvantage on attack rolls made with weapons other than this one.<br><br>In addition, while the sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save, you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it.<br><br>You can break the curse in the usual ways. Alternatively, casting Banishment on the sword forces the vengeful spirit to leave it. The sword then becomes a +1 weapon with no other properties.",
                        name: "Sword of Vengeance (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft, Melee Attacks +1, Melee Damage +1",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Trident (uncommon), requires attunement<br><br>This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast Dominate Beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.",
                        name: "Trident of Fish Command",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Range, Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Club (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Club +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dagger +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatclub +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Handaxe +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Javelin +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Hammer +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Mace +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Quarterstaff +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sickle +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Spear +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Crossbow +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dart +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortbow +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sling +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Battleaxe +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Flail +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Glaive +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greataxe +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatsword +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Halberd +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Lance +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longsword +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Maul +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Morningstar +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Pike +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Rapier +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Scimitar +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortsword +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Trident +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "War Pick +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Warhammer +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Whip +1",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Blowgun +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Hand Crossbow +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Heavy Crossbow +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longbow +1",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +1, Ranged Damage +1, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (uncommon)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Net +1",
                        modifiers: "Item Type: Ranged Weapon, Ranged Attacks +1, Ranged Damage +1, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Club (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (uncommon)<br><br>This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                        name: "Weapon of Warning (Net)",
                        modifiers: "Item Type: Ranged Weapon, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    }
                ],
                armor: [
                    //Uncommon Armor
                    {
						desc: "Chain Shirt (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (uncommon)<br><br>This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.",
						name: "Adamantine Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Padded Armor (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Padded)",
						modifiers: "Item Type: Light Armor, AC: 11, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Leather)",
						modifiers: "Item Type: Light Armor, AC: 11",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Studded Leather)",
						modifiers: "Item Type: Light Armor, AC: 12",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Hide)",
						modifiers: "Item Type: Medium Armor, AC: 12",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (uncommon)<br><br>While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.",
						name: "Mariner\'s Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Ring Mail (uncommon), requires attunement by a specific individual<br><br>Any nonmagical suit of heavy armor can be turned by mind flayers into mind carapace armor. Only one creature can attune to it: either a specific mind flayer or one of its thralls. While worn by any other creature, the mind carapace armor functions as normal armor of its kind. To its intended wearer, the armor grants advantage on Intelligence, Wisdom, and Charisma saving throws and makes its wearer immune to the frightened condition.",
						name: "Mind Carapace Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (uncommon), requires attunement by a specific individual<br><br>Any nonmagical suit of heavy armor can be turned by mind flayers into mind carapace armor. Only one creature can attune to it: either a specific mind flayer or one of its thralls. While worn by any other creature, the mind carapace armor functions as normal armor of its kind. To its intended wearer, the armor grants advantage on Intelligence, Wisdom, and Charisma saving throws and makes its wearer immune to the frightened condition.",
						name: "Mind Carapace Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (uncommon), requires attunement by a specific individual<br><br>Any nonmagical suit of heavy armor can be turned by mind flayers into mind carapace armor. Only one creature can attune to it: either a specific mind flayer or one of its thralls. While worn by any other creature, the mind carapace armor functions as normal armor of its kind. To its intended wearer, the armor grants advantage on Intelligence, Wisdom, and Charisma saving throws and makes its wearer immune to the frightened condition.",
						name: "Mind Carapace Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (uncommon), requires attunement by a specific individual<br><br>Any nonmagical suit of heavy armor can be turned by mind flayers into mind carapace armor. Only one creature can attune to it: either a specific mind flayer or one of its thralls. While worn by any other creature, the mind carapace armor functions as normal armor of its kind. To its intended wearer, the armor grants advantage on Intelligence, Wisdom, and Charisma saving throws and makes its wearer immune to the frightened condition.",
						name: "Mind Carapace Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Hide Armor (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Hide)",
						modifiers: "Item Type: Medium Armor, AC: 12",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
					{
						desc: "Chain Shirt (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13",
						properties: "",
						price: 50,
						weight: 10,
						amount: 1
					},
					{
						desc: "Scale Mail (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 50,
						weight: 22.5,
						amount: 1
					},
					{
						desc: "Breastplate (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 10,
						amount: 1
					},
					{
						desc: "Half Plate (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15",
						properties: "",
						price: 750,
						weight: 20,
						amount: 1
					},
                    {
						desc: "Ring Mail (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14",
						properties: "",
						price: 30,
						weight: 20,
						amount: 1
					},
					{
						desc: "Chain Mail (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16",
						properties: "",
						price: 75,
						weight: 27.5,
						amount: 1
					},
					{
						desc: "Splint Mail (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Mithral Armor(Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17",
						properties: "",
						price: 200,
						weight: 30,
						amount: 1
					},
					{
						desc: "Plate (uncommon)<br><br>Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn\'t.",
						name: "Plate",
						modifiers: "Item Type: Heavy Armor, AC: 18",
						properties: "",
						price: 1500,
						weight: 32.5,
						amount: 1
					},
                    {
						desc: "Shield (uncommon)<br><br>While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks. The shield is emblazoned with the symbol of an eye.",
						name: "Sentinel Shield",
						modifiers: "Item Type: Shield, AC: 2, Perception:Advantage, Initiative:Advantage",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (uncommon)<br><br>While holding this shield, you have +1 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
						name: "Sentinel Shield",
						modifiers: "Item Type: Shield, AC: 2, AC +1",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					}
                ],
                accessoires: [
                    //Uncommon Accessoires (Rings, Rods, Staffs, Wearables)
                ],
                scroll: [
                    //Uncommon Scrolls    
                ],
                misc: [
                    //Uncommon misc Items (edibles & other things that don't belong in previous categories)
                ]
            },
            rare: {
                weapon: [
                    //Rare Weapons
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>The black blade of this sword is crafted from a mysterious arcane alloy. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.<br><br>Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can\'t be used again until the next dusk.<br><br>Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it\'s immune to the frightened condition. Once you use this property, you can\'t do so again until the next dusk.",
                        name: "Acheron Blade (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>The black blade of this sword is crafted from a mysterious arcane alloy. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.<br><br>Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can\'t be used again until the next dusk.<br><br>Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it\'s immune to the frightened condition. Once you use this property, you can\'t do so again until the next dusk.",
                        name: "Acheron Blade (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>The black blade of this sword is crafted from a mysterious arcane alloy. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.<br><br>Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can\'t be used again until the next dusk.<br><br>Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it\'s immune to the frightened condition. Once you use this property, you can\'t do so again until the next dusk.",
                        name: "Acheron Blade (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>The black blade of this sword is crafted from a mysterious arcane alloy. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.<br><br>Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can\'t be used again until the next dusk.<br><br>Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it\'s immune to the frightened condition. Once you use this property, you can\'t do so again until the next dusk.",
                        name: "Acheron Blade (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>The black blade of this sword is crafted from a mysterious arcane alloy. You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you are immune to effects that turn undead.<br><br>Dark Blessing. While holding the sword, you can use an action to give yourself 1d4 + 4 temporary hit points. This property can\'t be used again until the next dusk.<br><br>Disheartening Strike. When you hit a creature with an attack using this weapon, you can fill the target with unsettling dread: the target has disadvantage on the next saving throw it makes before the end of your next turn. The creature ignores this effect if it\'s immune to the frightened condition. Once you use this property, you can\'t do so again until the next dusk.",
                        name: "Acheron Blade (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Arrows (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Arrows +2",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +2, Ranged Damage +2",
                        properties: "",
                        price: 1,
                        weight: 0.05,
                        amount: 20
                    },
                    {
                        desc: "Blowgun needles (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Blowgun needles +2",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +2, Ranged Damage +2",
                        properties: "",
                        price: 1,
                        weight: 0.02,
                        amount: 50
                    },
                    {
                        desc: "Crossbow bolts (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Crossbow bolts +2",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +2, Ranged Damage +2",
                        properties: "",
                        price: 1,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Sling bullets (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Sling bullets +2",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +2, Ranged Damage +2",
                        properties: "",
                        price: 0.04,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Handaxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.<br><br>Curse. This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.<br><br>Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.",
                        name: "Berserker Axe (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.<br><br>Curse. This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.<br><br>Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.",
                        name: "Berserker Axe (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.<br><br>Curse. This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.<br><br>Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.",
                        name: "Berserker Axe (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Club (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1,  Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning against undead, Melee Attacks +1, Melee Damage +1, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: slashing against undead, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1,  Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: piercing against undead, Ranged Attacks +1, Ranged Damage +1, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit an undead creature with an attack using this weapon, the attack deals an extra 1d8 damage of the weapon\'s type, and the creature has disadvantage on saving throws against effects that turn undead until the start of your next turn.",
                        name: "Corpse Slayer (Net)",
                        modifiers: "Item Type: Ranged Weapon, Secondary Damage: 1d8, Ranged Attacks +1, Ranged Damage +1, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>This magic sword\'s blade is fashioned from a horn or spine from a crystal dragon. When you hit with an attack roll using this sword, the target takes an extra 1d8 radiant damage.<br><br>The sword has 3 charges and regains 1d3 expended charges daily at dawn. When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra radiant damage the sword dealt.<br><br>While you\'re holding the sword, you can use a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet, to cause it to shed dim light in a 10-foot radius, or to douse the light.",
                        name: "Crystal Blade (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: radiant, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>This magic sword\'s blade is fashioned from a horn or spine from a crystal dragon. When you hit with an attack roll using this sword, the target takes an extra 1d8 radiant damage.<br><br>The sword has 3 charges and regains 1d3 expended charges daily at dawn. When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra radiant damage the sword dealt.<br><br>While you\'re holding the sword, you can use a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet, to cause it to shed dim light in a 10-foot radius, or to douse the light.",
                        name: "Crystal Blade (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: radiant, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>This magic sword\'s blade is fashioned from a horn or spine from a crystal dragon. When you hit with an attack roll using this sword, the target takes an extra 1d8 radiant damage.<br><br>The sword has 3 charges and regains 1d3 expended charges daily at dawn. When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra radiant damage the sword dealt.<br><br>While you\'re holding the sword, you can use a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet, to cause it to shed dim light in a 10-foot radius, or to douse the light.",
                        name: "Crystal Blade (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d8, Secondary Damage Type: radiant, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>This magic sword\'s blade is fashioned from a horn or spine from a crystal dragon. When you hit with an attack roll using this sword, the target takes an extra 1d8 radiant damage.<br><br>The sword has 3 charges and regains 1d3 expended charges daily at dawn. When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra radiant damage the sword dealt.<br><br>While you\'re holding the sword, you can use a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet, to cause it to shed dim light in a 10-foot radius, or to douse the light.",
                        name: "Crystal Blade (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: radiant, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>This magic sword\'s blade is fashioned from a horn or spine from a crystal dragon. When you hit with an attack roll using this sword, the target takes an extra 1d8 radiant damage.<br><br>The sword has 3 charges and regains 1d3 expended charges daily at dawn. When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra radiant damage the sword dealt.<br><br>While you\'re holding the sword, you can use a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet, to cause it to shed dim light in a 10-foot radius, or to douse the light.",
                        name: "Crystal Blade (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d8, Secondary Damage Type: radiant, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can\'t be used this way again until the next dawn.",
                        name: "Dagger of Venom",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 2d10, Secondary Damage Type: poison, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare), requires attunement by a cleric or paladin<br><br>The rounded head of this flail is perforated with tiny holes, arranged in symbols and patterns. The flail counts as a holy symbol for you. When you hit with an attack using this magic flail, the target takes an extra 1d8 radiant damage.<br><br>As a bonus action, you can speak the command word to cause the flail to emanate a thin cloud of incense out to 10 feet for 1 minute. At the start of each of your turns, you and any other creatures in the incense each regain 1d4 hit points. This property can\'t be used again until the next dawn.",
                        name: "Flail ",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: radiant, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type. For the purpose of this weapon, \'dragon\' refers to any creature with the dragon type, including dragon turtles and wyverns.",
                        name: "Dragon Slayer (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 3d6, Secondary Damage Type: slashing against dragons, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type. For the purpose of this weapon, \'dragon\' refers to any creature with the dragon type, including dragon turtles and wyverns.",
                        name: "Dragon Slayer (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 3d6, Secondary Damage Type: slashing against dragons, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type. For the purpose of this weapon, \'dragon\' refers to any creature with the dragon type, including dragon turtles and wyverns.",
                        name: "Dragon Slayer (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 3d6, Secondary Damage Type: piercing against dragons, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type. For the purpose of this weapon, \'dragon\' refers to any creature with the dragon type, including dragon turtles and wyverns.",
                        name: "Dragon Slayer (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 3d6, Secondary Damage Type: slashing against dragons, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type. For the purpose of this weapon, \'dragon\' refers to any creature with the dragon type, including dragon turtles and wyverns.",
                        name: "Dragon Slayer (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 3d6, Secondary Damage Type: slashing against dragons, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare), requires attunement<br><br>The limb tips of this magic bow are shaped like a dragon\'s wings, and the weapon is infused with the essence of a chromatic, gem, or metallic dragon\'s breath. When you hit with an attack roll using this magic bow, the target takes an extra 1d6 damage of the same type as the breath infused in the bow—acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.<br><br>If you load no ammunition in the weapon, it produces its own, automatically creating one piece of magic ammunition when you pull back the string. The ammunition created by the bow vanishes the instant after it hits or misses a target.",
                        name: "Dragon Wing Bow(Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing,  Secondary Damage: 1d6, Secondary Damage Type: acid cold fire force lightning necrotic poison psychic radiant or thunder, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare), requires attunement<br><br>The limb tips of this magic bow are shaped like a dragon\'s wings, and the weapon is infused with the essence of a chromatic, gem, or metallic dragon\'s breath. When you hit with an attack roll using this magic bow, the target takes an extra 1d6 damage of the same type as the breath infused in the bow—acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.<br><br>If you load no ammunition in the weapon, it produces its own, automatically creating one piece of magic ammunition when you pull back the string. The ammunition created by the bow vanishes the instant after it hits or misses a target.",
                        name: "Dragon Wing Bow (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: acid cold fire force lightning necrotic poison psychic radiant or thunder, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Club (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft.",
                        properties: "Light",
                        price: 0.1,
                        amount: 1,
                        weight: 2
                    },
                    {
                        desc: "Dagger (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Javelin (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 80/320",
                        properties: "Ammunition, Two-Handed",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s brath, Range: 5 ft., Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "",
                        price: 10,
                        weight: 2,
                        ammount: 1
                    },
                    {
                        desc: "Glaive (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 10 ft.",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: slashing, Alternate Secondary Damage: 5, Alternate Secondary Damage Type: dragon\'s breath, Alternate Reach: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properties: "Finesse, Reach",
                        price: 2,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Stirring Dragon\'s Wrath Weapon (Net)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 0, Secondary Damage: 1d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +1, Ranged Damage +1, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
                        name: "Flame Tongue Greatsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: fire, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
                        name: "Flame Tongue Longsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: fire, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
                        name: "Flame Tongue Rapier",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: fire, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
                        name: "Flame Tongue Scimitar",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: fire, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
                        name: "Flame Tongue Shortsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: fire, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Handaxe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Battleaxe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Greataxe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Greatsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Longsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Rapier",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: piercing against giants, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Scimitar",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \'giant\' refers to any creature with the giant type, including ettins and trolls.",
                        name: "Giant Slayer Shortsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against giants, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare), requires attunement<br><br>When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.<br><br>While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
                        name: "Mace of Disruption",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: radiant against fiends or undead, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare)<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus increases to +3 when you use this mace to attack a construct.<br><br>When you roll a 20 on an attack roll made with this weapon, the target takes an extra 7 bludgeoning damage, or an extra 14 bludgeoning damage if it\'s a construct. If a construct has 25 hit points or fewer after taking this damage, it is destroyed.",
                        name: "Mace ",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare), requires attunement<br><br>This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can\'t willingly move to a space within 30 feet of you. It also can\'t take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of its turns, a creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.<br><br>The mace regains 1d3 expended charges daily at dawn.",
                        name: "Mace of Terror",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement by a specific individual<br><br>Mind flayers can turn any nonmagical sword into a mind blade. Only one creature can attune to it: either a specific mind flayer or one of its thralls. In the hands of any other creature, the mind blade functions as a normal sword of its kind. In the hands of its intended wielder, the mind blade is a magic weapon that deals an extra 2d6 psychic damage to any target it hits.",
                        name: "Mind Blade (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: psychic, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement by a specific individual<br><br>Mind flayers can turn any nonmagical sword into a mind blade. Only one creature can attune to it: either a specific mind flayer or one of its thralls. In the hands of any other creature, the mind blade functions as a normal sword of its kind. In the hands of its intended wielder, the mind blade is a magic weapon that deals an extra 2d6 psychic damage to any target it hits.",
                        name: "Mind Blade (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: psychic, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement by a specific individual<br><br>Mind flayers can turn any nonmagical sword into a mind blade. Only one creature can attune to it: either a specific mind flayer or one of its thralls. In the hands of any other creature, the mind blade functions as a normal sword of its kind. In the hands of its intended wielder, the mind blade is a magic weapon that deals an extra 2d6 psychic damage to any target it hits.",
                        name: "Mind Blade (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: psychic, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement by a specific individual<br><br>Mind flayers can turn any nonmagical sword into a mind blade. Only one creature can attune to it: either a specific mind flayer or one of its thralls. In the hands of any other creature, the mind blade functions as a normal sword of its kind. In the hands of its intended wielder, the mind blade is a magic weapon that deals an extra 2d6 psychic damage to any target it hits.",
                        name: "Mind Blade (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: psychic, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement by a specific individual<br><br>Mind flayers can turn any nonmagical sword into a mind blade. Only one creature can attune to it: either a specific mind flayer or one of its thralls. In the hands of any other creature, the mind blade functions as a normal sword of its kind. In the hands of its intended wielder, the mind blade is a magic weapon that deals an extra 2d6 psychic damage to any target it hits.",
                        name: "Mind Blade (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: psychic, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare), requires attunement by a mind flayer<br><br>In the hands of a creature other than a mind flayer, a mind lash functions as a normal whip. In the hands of an illithid, this magic weapon strips away a creature\'s will to survive as it also strips away flesh, dealing an extra 2d4 psychic damage to any target it hits. Any creature that takes psychic damage from the mind lash must also succeed on a DC 15 Wisdom saving throw or have disadvantage on Intelligence, Wisdom, and Charisma saving throws for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
                        name: "Mind Lash",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 2d4, Secondary Damage Type: psychic, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare), requires attunement by a Druid or Ranger<br><br>This silver-bladed sickle glimmers softly with moonlight. While holding this magic weapon, you gain a +2 bonus to attack and damage rolls made with it, and you gain a +2 bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells. In addition, you can use the sickle as a spellcasting focus for your druid and ranger spells.<br><br>When you cast a spell that restores hit points, you can roll a d4 and add the number rolled to the amount of hit points restored, provided you are holding the sickle.",
                        name: "Moon Sickle +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Spell Attack +2, Spell DC +2",
                        properties: "Light",
                        weight: 2,
                        price: 1,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare), requires attunement<br><br>This weapon is a magic dagger disguised as a sewing needle. When you hold it and use a bonus action to speak its command word, it transforms into a dagger or back into a needle.<br><br>You gain a +1 bonus to attack and damage rolls made with the dagger. While holding it, you can use an action to cast the Mending cantrip from it.",
                        name: "Needle of Mending",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.<br><br>You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.<br><br>The sword\'s luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
                        name: "Sun Blade",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: radiant, Secondary Damage: 1d8, Secondary Damage Type: radiant against undead, Alternate Damage: 1d10, Alternate Damage Type: radiant, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>As an action, you can hurl the weapon up to 120 feet to a point you can see. When it reaches that point, the weapon vanishes in an explosion, and each creature in a 20-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 6d6 fire damage on a failed save, or half as much damage on a successful one. Afterward, you can use an action to cause the weapon to reappear in your empty hand. You can\'t cause it to explode again until you finish a short or long rest.<br><br>If you don\'t call the weapon back to your hand, it reappears at the point where it exploded when you are no longer attuned to it or when 24 hours have passed.",
                        name: "Sunforger",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Alternate Damage: 6d6, Alternate Damage Type: fire, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn\'t a construct or an undead. You also gain 10 temporary hit points.",
                        name: "Sword of Life Stealing (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn\'t a construct or an undead. You also gain 10 temporary hit points.",
                        name: "Sword of Life Stealing (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn\'t a construct or an undead. You also gain 10 temporary hit points.",
                        name: "Sword of Life Stealing (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn\'t a construct or an undead. You also gain 10 temporary hit points.",
                        name: "Sword of Life Stealing (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn\'t a construct or an undead. You also gain 10 temporary hit points.",
                        name: "Sword of Life Stealing (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare), requires attunement<br><br>Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.<br><br>Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature\'s turns, it takes 1d4 necrotic damage for each time you\'ve wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                        name: "Sword of Wounding (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare), requires attunement<br><br>Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.<br><br>Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature\'s turns, it takes 1d4 necrotic damage for each time you\'ve wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                        name: "Sword of Wounding (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare), requires attunement<br><br>Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.<br><br>Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature\'s turns, it takes 1d4 necrotic damage for each time you\'ve wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                        name: "Sword of Wounding (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare), requires attunement<br><br>Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.<br><br>Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature\'s turns, it takes 1d4 necrotic damage for each time you\'ve wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                        name: "Sword of Wounding (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare), requires attunement<br><br>Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.<br><br>Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature\'s turns, it takes 1d4 necrotic damage for each time you\'ve wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                        name: "Sword of Wounding (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare)<br><br>You have a +1 bonus to attack and damage rolls made with this weapon.<br><br>When you make a ranged attack with this sling and hit a target, you can cause the ammunition to ricochet toward a second target within 10 feet of the first, and then make a ranged attack against the second target.",
                        name: "Two-Birds Sling",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Ranged Attacks +1, Ranged Damage +1, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Club (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (rare)<br><br>When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon\'s type.",
                        name: "Vicious Weapon (Net)",
                        modifiers: "Item Type: Ranged Weapon, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Club (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Club +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dagger +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatclub +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Handaxe +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Javelin +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Hammer +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Mace +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Quarterstaff +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sickle +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Spear +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (rare)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Crossbow +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dart +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortbow +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sling +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Ranged Attacks +2, Ranged Damage +2, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Battleaxe +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Flail +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Glaive +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greataxe +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatsword +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Halberd +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Lance +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longsword +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Maul +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Morningstar +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Pike +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Rapier +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Scimitar +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortsword +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Trident +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "War Pick +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Warhammer +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Whip +2",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Blowgun +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Hand Crossbow +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Heavy Crossbow +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longbow +2",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +2, Ranged Damage +2, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (rare)<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Net +2",
                        modifiers: "Item Type: Ranged Weapon, Ranged Attacks +2, Ranged Damage +2, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Club (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
					
					
                    {
                        desc: "Battleaxe (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (rare)<br><br>When you damage a creature with an attack using this magic weapon, the target can\'t regain hit points until the start of your next turn.",
                        name: "Weapon of Certain Death (Net)",
                        modifiers: "Item Type: Ranged Weapon, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (rare)<br><br>You have a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>When you use this axe to make an attack against a plant (an ordinary plant or a creature with the Plant type) or a wooden object that isn\'t being worn or carried, the attack deals an extra 2d6 slashing damage on a hit.",
                        name: "Woodcutter\'s Axe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: slashing against plants/wood, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    }
                ],
                armor: [
                    //Rare Armor
                    {
						desc: "Padded Armor (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Padded +1",
						modifiers: "Item Type: Light Armor, AC: 11, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Leather +2",
						modifiers: "Item Type: Light Armor, AC: 11, AC +2",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Studded Leather +2",
						modifiers: "Item Type: Light Armor, AC: 12, AC +2",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Hide",
						modifiers: "Item Type: Medium Armor, AC: 12, AC +2",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Chain Shirt",
						modifiers: "Item Type: Medium Armor, AC: 13, AC +2",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Scale Mail",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Breastplate",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +2",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Half Plate",
						modifiers: "Item Type: Medium Armor, AC: 15, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Ring Mail",
						modifiers: "Item Type: Heavy Armor, AC: 14, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Chain Mail",
						modifiers: "Item Type: Heavy Armor, AC: 16, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Splint Mail",
						modifiers: "Item Type: Heavy Armor, AC: 17, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Plate",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Padded Armor (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Padded)",
						modifiers: "Item Type: Light Armor, AC: 11, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Leather)",
						modifiers: "Item Type: Light Armor, AC: 11",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Studded Leather)",
						modifiers: "Item Type: Light Armor, AC: 12",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Hide)",
						modifiers: "Item Type: Medium Armor, AC: 12",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (rare), requires attunement<br><br>You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below.<br><br>1 - Acid<br><br>2 - Cold<br><br>3 - Fire<br><br>4 - Force<br><br>5 - Lightning<br><br>6 - Necrotic<br><br>7 - Poison<br><br>8 - Psychic<br><br>9 - Radiant<br><br>10 - Thunder",
						name: "Armor of Resistance (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Plate (rare), requires attunement<br><br>While wearing this armor, you have resistance to one of the following damage types: bludgeoning, piercing, or slashing. The DM chooses the type or determines it randomly.<br><br>Curse. This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are target by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, you have vulnerability to two of the three damage types associated with the armor (not the one to which it grants resistance).",
						name: "Armor of Vulnerability (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Shield (rare), requires attunement<br><br>You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield\'s normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
						name: "Arrow-Catching Shield",
						modifiers: "Item Type: Shield, AC: 2, AC +2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (rare), requires attunement<br><br>While holding this iron tower shield, you gain a +1 bonus to AC. This bonus is in addition to the shield\'s normal bonus to AC.<br><br>Additionally, the shield has 3 charges, and it regains 1d3 expended charges daily at dawn. If you are holding the shield and push a creature within your reach at least 5 feet away, you can expend 1 charge to push that creature an additional 10 feet, knock it prone, or both.",
						name: "Battering Shield",
						modifiers: "Item Type: Shield, AC: 2, AC +1",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Chain Shirt (rare)<br><br>You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.",
						name: "Elven Chain",
						modifiers: "Item Type: Medium Armor, AC: 13, AC +1",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
                    {
						desc: "Studded Leather (rare)<br><br>While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor\'s command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance last until you use this property again or remove the armor.",
						name: "Studded Leather",
						modifiers: "Item Type: Light Armor, AC: 12, AC +1",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Chain Shirt (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (rare)<br><br>This suit of armor is reinforced with a magically enhanced metal alloy called mizzium, which is made in Izzet foundries. While you\'re wearing the armor, any critical hit against you becomes a normal hit. In addition, when you are subjected to a magical effect that allows you to make a Strength or Constitution saving throw to take only half damage, you instead take no damage if you succeed on the saving throw.",
						name: "Mizzium Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Breastplate (rare), requires attunement<br><br>This magical armor appears as a jug of molten bronze. When you attune to it, the bronze adheres and contours to your skin. The armor can be worn under normal clothes, but it doesn\'t impede bodily functions. Once you put it on, it can\'t be removed unless you choose to do so.<br><br>While wearing the armor, you have resistance to fire damage. The armor also doesn\'t impose disadvantage on Dexterity (Stealth) checks.",
						name: "Molten Bronze Skin (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (rare), requires attunement<br><br>This magical armor appears as a jug of molten bronze. When you attune to it, the bronze adheres and contours to your skin. The armor can be worn under normal clothes, but it doesn\'t impede bodily functions. Once you put it on, it can\'t be removed unless you choose to do so.<br><br>While wearing the armor, you have resistance to fire damage. The armor also doesn\'t impose disadvantage on Dexterity (Stealth) checks.",
						name: "Molten Bronze Skin (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Plate (rare), requires attunement<br><br>This magical armor appears as a jug of molten bronze. When you attune to it, the bronze adheres and contours to your skin. The armor can be worn under normal clothes, but it doesn\'t impede bodily functions. Once you put it on, it can\'t be removed unless you choose to do so.<br><br>While wearing the armor, you have resistance to fire damage. The armor also doesn\'t impose disadvantage on Dexterity (Stealth) checks.",
						name: "Molten Bronze Skin (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Shield (rare), requires attunement<br><br>Soldiers of the Boros Legion consider it an honor to bear this shield, even knowing that it might be the last honor they receive. The front of the shield is sculpted to depict a grieving human face.<br><br>You gain a +1 bonus to AC for every two allies within 5 feet of you (up to a maximum of +3) while you wield this shield. This bonus is in addition to the shield\'s normal bonus to AC.<br><br>When a creature you can see within 5 feet of you takes damage, you can use your reaction to take that damage, instead of the creature taking it. When you do so, the damage type changes to force.",
						name: "Pariah\'s Shield",
						modifiers: "Item Type: Shield, AC: 2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (rare)<br><br>While holding this shield, you have a +2 bonus to AC.This bonus is in addition to the shield\'s normal bonus to AC.",
						name: "Shield +2",
						modifiers: "Item Type: Shield, AC: 2, AC +2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (rare)<br><br>A mind flayer skilled at crafting magic items creates a shield of far sight by harvesting an eye from an intelligent humanoid and magically implanting it on the outer surface of a nonmagical shield. The shield becomes a magic item once the eye is implanted, whereupon the mind flayer can give the shield to a thrall or hang it on a wall in its lair. As long as the shield is on the same plane of existence as its creator, the mind flayer can see through the shield\'s eye, which has darkvision out to a range of 60 feet. While peering through this magical eye, the mind flayer can use its Mind Blast action as though it were standing behind the shield.<br><br>If a shield of far sight is destroyed, the mind flayer that created it is blinded for 2d12 hours.",
						name: "Shield of Far Sight",
						modifiers: "Item Type: Shield, AC: 2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (rare), requires attunement<br><br>While holding this shield, you have resistance to damage from ranged weapon attacks.<br><br>Curse. This shield is cursed. Attuning to it curses you until you are targeted by the Remove Curse spell or similar magic. Removing the shield fails to end the curse on you. Whenever a ranged weapon attack is made against a target within 10 feet of you, the curse causes you to become the target instead.",
						name: "Shield of Missile Attraction",
						modifiers: "Item Type: Shield, AC: 2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					}
                ],
                accessoires: [
                    //Rare Accessoires (Rings, Rods, Staffs, Wearables)
                ],
                scroll: [
                    //Rare Scrolls    
                ],
                misc: [
                    //Rare misc Items (edibles & other things that don't belong in previous categories)
                ]
            },
            very_rare: {
                weapon: [
                    //Very Rare Weapons
                    {
                        desc: "Arrows (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Arrows +3",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +3, Ranged Damage +3",
                        properties: "",
                        price: 1,
                        weight: 0.05,
                        amount: 20
                    },
                    {
                        desc: "Blowgun needles (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Blowgun needles +3",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +3, Ranged Damage +3",
                        properties: "",
                        price: 1,
                        weight: 0.02,
                        amount: 50
                    },
                    {
                        desc: "Crossbow bolts (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Crossbow bolts +3",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +3, Ranged Damage +3",
                        properties: "",
                        price: 1,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Sling bullets (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.",
                        name: "Sling bullets +3",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +3, Ranged Damage +3",
                        properties: "",
                        price: 0.04,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Arrows (very rare)<br><br>An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both arrows of dragon slaying and arrows of blue dragon slaying. If a creature belonging to the type, race, or group associated with an arrow of slaying takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.<br><br>Once an arrow of slaying deals its extra damage to a creature, it becomes a nonmagical arrow.<br><br>Other types of magic ammunition of this kind exist, such as bolts of slaying meant for a crossbow, though arrows are most common.",
                        name: "Arrow of Slaying",
                        modifiers: "Item Type: Ammunition, Damage: 6d10",
                        properties: "",
                        price: 1,
                        weight: 0.05,
                        amount: 20
                    },
                    {
                        desc: "Greataxe (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic axe. The axe deals an extra 1d6 necrotic damage to creatures that aren\'t constructs or undead. If you reduce such a creature to 0 hit points with an attack using this axe, you gain 10 temporary hit points.<br><br>This axe is forged from a dark, rust-colored metal and once belonged to the goliath barbarian Grog Strongjaw of Vox Machina.",
                        name: "Bloodaxe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: necrotic against living creatures, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare), requires attunement<br><br>You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.<br><br>While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.<br><br>After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free , it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
                        name: "Dancing Sword (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.<br><br>While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.<br><br>After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free , it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
                        name: "Dancing Sword (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (very rare), requires attunement<br><br>You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.<br><br>While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.<br><br>After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free , it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
                        name: "Dancing Sword (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.<br><br>While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.<br><br>After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free , it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
                        name: "Dancing Sword (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (very rare), requires attunement<br><br>You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.<br><br>While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.<br><br>After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free , it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
                        name: "Dancing Sword (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Club (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "Light",
                        price: 0.1,
                        amount: 1,
                        weight: 2
                    },
                    {
                        desc: "Dagger (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Weakened Dragon\'s Wrath Weapon (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Javelin (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Weakened Dragon\'s Wrath Weapon (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Weakened Dragon\'s Wrath Weapon (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 80/320",
                        properties: "Ammunition, Two-Handed",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s brath, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "",
                        price: 10,
                        weight: 2,
                        ammount: 1
                    },
                    {
                        desc: "Glaive (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Weakened Dragon\'s Wrath Weapon (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 10 ft.",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Stirring weapon has the Slumbering property. In addition, you gain a +1 bonus to attack and damage rolls made using the weapon. On a hit, the weapon deals an extra 1d6 damage of the type dealt by the dragon\'s breath weapon.",
                        name: "Weakened Dragon\'s Wrath Weapon (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: slashing",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +2, Melee Damage +2, Range: 10 ft",
                        properties: "Finesse, Reach",
                        price: 2,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (very rare), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Wakened weapon has the Slumbering property, and it improves on the Stirring property. The bonus to attack and damage rolls increases to +2, and the extra damage dealt by the weapon increases to 2d6.<br><br>As an action, you can unleash a 30-foot cone of destructive energy from the weapon. Each creature in that area must make a DC 16 Dexterity saving throw, taking 8d6 damage of the type dealt by the dragon\'s breath weapon on a failed save, or half as much damage on a successful one. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Weakened Dragon\'s Wrath Weapon (Net)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 0, Secondary Damage: 2d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +2, Ranged Damage +2, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (very rare), requires attunement<br><br>This item takes the form of a leather-wrapped metal rod emblazoned with the symbol of Pelor, the Dawn Father. While grasping the rod, you can use a bonus action to cause a warhammer head of crackling radiance to spring into existence. The warhammer\'s radiant head emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. You can use an action to make the radiant head disappear.<br><br>While the radiant head is active, you gain a +2 bonus to attack and damage rolls made with this magic weapon, and attacks with the weapon deal radiant damage instead of bludgeoning damage. An undead creature hit by the weapon takes an extra 1d8 radiant damage.<br><br>While you are holding Duskcrusher and its radiant head is active, you can use an action to cast the Sunbeam spell (save DC 15) from the weapon, and this action can\'t be used again until the next dawn.",
                        name: "Duskcrusher",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: radiant against undead, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (very rare), requires attunement by a dwarf<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra ld8 damage or, if the target is a giant, 2d8 damage. Immediately after the attack, the weapon flies back to your hand.",
                        name: "Dwarven Thrower",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 1d8, Secondary Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Range: 20/60",
                        properties: "Versatile, Thrown",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (very rare), requires attunement<br><br>This long, whip-like strand of tough muscle bears a sharp stinger at one end. To attune to this symbiotic weapon, you wrap the whip around your wrist for the entire attunement period, during which time the whip painfully embeds its tendrils into your arm.<br><br>You gain a +2 bonus to attack and damage rolls made with this magic whip, but attack rolls made against aberrations with this weapon have disadvantage. A creature hit by this weapon takes an extra 1d6 psychic damage. When you roll a 20 on the d20 for an attack roll with this weapon, the target is stunned until the end of its next turn.<br><br>As a bonus action, you can sheathe the whip by causing it to retract into your arm, or draw the whip out of your arm again.<br><br>Symbiotic Nature. The whip can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the whip ends, and it detaches from you.",
                        name: "Dyrrn\'s Tentacle Whip",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: psychic, Melee Attacks +1, Melee Damage +1, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare), requires attunement<br><br>When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.<br><br>In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.<br><br>When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
                        name: "Frost Brand Greatsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Secondary Damage: 1d6, Secondary Damage Type: cold, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.<br><br>In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.<br><br>When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
                        name: "Frost Brand Longsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: cold Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (very rare), requires attunement<br><br>When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.<br><br>In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.<br><br>When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
                        name: "Frost Brand Rapier",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 1d6, Secondary Damage Type: cold, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.<br><br>In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.<br><br>When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
                        name: "Frost Brand Scimitar",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: cold, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (very rare), requires attunement<br><br>When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.<br><br>In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.<br><br>When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
                        name: "Frost Brand (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 1d6, Secondary Damage Type: cold, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sickle (rare), requires attunement by a Druid or Ranger<br><br>This silver-bladed sickle glimmers softly with moonlight. While holding this magic weapon, you gain a +3 bonus to attack and damage rolls made with it, and you gain a +2 bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells. In addition, you can use the sickle as a spellcasting focus for your druid and ranger spells.<br><br>When you cast a spell that restores hit points, you can roll a d4 and add the number rolled to the amount of hit points restored, provided you are holding the sickle.",
                        name: "Moon Sickle +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Spell Attack +3, Spell DC +3",
                        properties: "Light",
                        weight: 2,
                        price: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                        name: "Nine Lives Stealer (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                        name: "Nine Lives Stealer (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                        name: "Nine Lives Stealer (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                        name: "Nine Lives Stealer (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
                        name: "Nine Lives Stealer (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Longbow (very rare), requires attunement<br><br>When you nock an arrow on this bow, it whispers in Elvish, \'Swift defeat to my enemies.\' When you use this weapon to make a ranged attack, you can, as a command phrase, say, \'Swift death to you who have wronged me.\' The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.<br><br>When you make a ranged attack roll with this weapon against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 piercing damage.<br><br>While your sworn enemy lives, you have disadvantage on attack rolls with all other weapons.",
                        name: "Oathbow",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 3d6, Secondary Damage: piercing, Ranged Attacks:Advantage, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
                        name: "Scimitar of Speed",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Sling bullets (very rare)<br><br>The sling bullets come in a pouch, which contains 1d4 + 4 bullets. Roll on the Magic Sling Bullets table for each bullet to determine its magical property.<br><br>You have a +2 bonus to attack and damage rolls made with each of these bullets. If a bullet misses its target, the bullet teleports back into the pouch. Once a bullet hits a target, the bullet loses its magic.<br><br>1 - Banishment. A creature that takes damage from this bullet must succeed on a DC 15 Charisma saving throw or be banished as though affected by the Banishment spell.<br><br>Fulguration. On a hit, this bullet deals an extra 2d8 lightning damage to its target. All other creatures within 10 feet of the target must each succeed on a DC 15 Constitution saving throw or take 1d8 thunder damage.<br><br>Stunning. On a hit, this bullet deals an extra 1d10 force damage, and the target is stunned until the end of your next turn.<br><br>Tracking. A creature that takes damage from this bullet is marked with a glowing rune where the bullet hit. The mark lasts 24 hours. While the creature is marked, you always know the direction to it.",
                        name: "Sling Bullets of Althemone",
                        modifiers: "Item Type: Ammunition, Ranged Attacks +2, Ranged Damage +2",
                        properties: "",
                        price: 1,
                        weight: 0.075,
                        amount: 20
                    },
                    {
                        desc: "Longsword (very rare), requires attunement by a good-aligned creature<br><br>You have a +2 bonus to attack and damage rolls made with this magic weapon.<br><br>Revivify. You can use an action to cast the Revivify spell from the sword. You must touch the target with the sword to cast the spell. Once this property of the weapon is used, it can\'t be used again until the next dawn.<br><br>Sentience. Steel is a sentient, lawful good longsword with an Intelligence of 8, a Wisdom of 11, and a Charisma of 15. It can see and hear out to a range of 60 feet. The sword can speak, read, and understand Common and Draconic. It frets over your well-being while you are attuned to it, and it doesn\'t like to back down from a fight.",
                        name: "Steel",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +2, Melee Damage +2, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare), requires attunement<br><br>When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.<br><br>When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20 you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.<br><br>In addition, you can speak the sword\'s command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
                        name: "Sword of Sharpness (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.<br><br>When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20 you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.<br><br>In addition, you can speak the sword\'s command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
                        name: "Sword of Sharpness (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare), requires attunement<br><br>When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.<br><br>When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20 you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.<br><br>In addition, you can speak the sword\'s command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
                        name: "Sword of Sharpness (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. Additionally, once on each of your turns, you can use one of the following properties if you\'re holding the sword:<br><br>- Immediately after you use the Attack action to attack with the sword, you can enable one creature within 60 feet of you to use its reaction to make one weapon attack.<br><br>- Immediately after you take the Dash action, you can enable one creature within 60 feet of you to use its reaction to move up to its speed.<br><br>- Immediately after you take the Dodge action, you can enable one creature within 60 feet of you to use its reaction to gain the benefits of the Dodge action.",
                        name: "Sword of the Paruns",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Club (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Club +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Light",
                        price: 0.1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Dagger (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dagger +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatclub +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Handaxe +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Jevelin (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Javelin +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Hammer +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Mace +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Melee Damage +3, Melee Attacks +3, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Quarterstaff +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sickle +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Spear +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Light Crossbow +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Dart +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortbow +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 80/320",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Sling +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Ranged Attacks +3, Ranged Damage +3, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Battleaxe +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Flail +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Glaive (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Glaive +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greataxe +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Greatsword +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Halberd +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Lance +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longsword +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Maul +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Morningstar +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Pike +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Rapier +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Scimitar +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Shortsword +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Trident +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "War Pick +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Warhammer +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Whip +3",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properites: "Finesse, Reach",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Blowgun +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Hand Crossbow +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Heavy Crossbow +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Longbow +3",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Ranged Attacks +3, Ranged Damage +3, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (very rare)<br><br>You have a +3 bonus to attack and damage rolls made with this magic weapon.",
                        name: "Net +3",
                        modifiers: "Item Type: Ranged Weapon, Ranged Attacks +3, Ranged Damage +3, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    }
                ],
                armor: [
                    //Very Rare Armor
                    {
						desc: "Shield (very rare), requires attunement<br><br>While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free.",
						name: "Animated Shield",
						modifiers: "Item Type: Shield, AC: 2",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Padded Armor (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Padded +2",
						modifiers: "Item Type: Light Armor, AC: 11, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Leather +2",
						modifiers: "Item Type: Light Armor, AC: 11, AC +2",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Studded Leather +2",
						modifiers: "Item Type: Light Armor, AC: 12, AC +2",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Hide +2",
						modifiers: "Item Type: Medium Armor, AC: 12, AC +2",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Chain Shirt +2",
						modifiers: "Item Type: Medium Armor, AC: 13, AC +2",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Scale Mail +2",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Breastplate +2",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +2",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Half Plate +2",
						modifiers: "Item Type: Medium Armor, AC: 15, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Ring Mail +2",
						modifiers: "Item Type: Heavy Armor, AC: 14, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Chain Mail +2",
						modifiers: "Item Type: Heavy Armor, AC: 16, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Splint Mail +2",
						modifiers: "Item Type: Heavy Armor, AC: 17, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (very rare)<br><br>You have a +2 bonus to AC while wearing this armor.",
						name: "Plate +2",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Plate (very rare), requires attunement<br><br>While wearing this armor, you gain a +1 bonus to AC, and you can understand and speak Abyssal. In addition, the armor's clawed gauntlets turn unarmed strikes with your hands into magic weapons that deal slashing damage, with a +1 bonus to attack rolls and damage rolls and a damage die of 1d8.<br><br>Curse. Once you don this cursed armor, you can\'t doff it unless you are targeted by the Remove Curse spell or similar magic. While wearing the armor, you have disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.",
						name: "Demon Armor",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +1, Damage: 1d8, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Scale Mail (very rare), requires attunement<br><br>Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued.<br><br>While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table).<br><br>Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can\'t be used again until the next dawn.<br><br>Black - Acid<br><br>Blue - Lightning<br><br>Brass - Fire<br><br>Bronze - Lightning<br><br>Copper - Acid<br><br>Gold - Fire<br><br>Green - Poison<br><br>Red - Fire<br><br>Silver - Cold<br><br>White - Cold<br>br>",
						name: "Dragon Scale Mail",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +1, Saving Thows:Advantage, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
                    {
						desc: "Plate (very rare)<br><br>While wearing this armor, you gain a +2 bonus to AC. In addition, if an effect moves you against your will along the ground, you can use your reaction to reduce the distance you are moved by up to 10 feet.",
						name: "Dwarven Plate",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +2, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Leather Armor (very rare), requires attunement<br><br>You gain a +1 bonus to AC while wearing this armor.<br><br>The coat has 3 charges. When you hit a creature with an attack and that creature doesn't have all its hit points, you can expend 1 charge to deal an extra 1d10 necrotic damage to the target. The coat regains 1d3 expended charges daily at dawn.",
						name: "Hunter\'s Coat",
						modifiers: "Item Type: Light Armor, AC: 11, AC +1",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
                    {
						desc: "Padded Armor (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Padded)",
						modifiers: "Item Type: Light Armor, AC: 11, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Leather)",
						modifiers: "Item Type: Light Armor, AC: 11, AC +1",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Studded Leather)",
						modifiers: "Item Type: Light Armor, AC: 12, AC +1",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Hide)",
						modifiers: "Item Type: Medium Armor, AC: 12, AC +1",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13, AC +1",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +1",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (very rare)<br><br>You have a +1 bonus to AC while wearing this armor, which shimmers softly.<br><br>If you die while wearing the armor, it is destroyed, and each celestial, fey, and fiend with 30 feet of you must succeed on a DC 15 Charisma saving throw or be banished to its home plane of existence, unless it is already there.",
						name: "Last Stand Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Padded Armor (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Padded)",
						modifiers: "Item Type: Light Armor, AC: 11, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 5,
						weight: 8,
						amount: 1
					},
					{
						desc: "Leather Armor (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Leather)",
						modifiers: "Item Type: Light Armor, AC: 11, AC +1",
						properties: "",
						price: 10,
						weight: 10,
						amount: 1
					},
					{
						desc: "Studded Leather (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Studded Leather)",
						modifiers: "Item Type: Light Armor, AC: 12, AC +1",
						properties: "",
						price: 45,
						weight: 13,
						amount: 1
					},
                    {
						desc: "Hide Armor (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Hide)",
						modifiers: "Item Type: Medium Armor, AC: 12, AC +1",
						properties: "",
						price: 10,
						weight: 12,
						amount: 1
					},
					{
						desc: "Chain Shirt (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Chain Shirt)",
						modifiers: "Item Type: Medium Armor, AC: 13, AC +1",
						properties: "",
						price: 50,
						weight: 20,
						amount: 1
					},
					{
						desc: "Scale Mail (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Scale Mail)",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 50,
						weight: 45,
						amount: 1
					},
					{
						desc: "Breastplate (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Breastplate)",
						modifiers: "Item Type: Medium Armor, AC: 14, AC +1",
						properties: "",
						price: 400,
						weight: 20,
						amount: 1
					},
					{
						desc: "Half Plate (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Half Plate)",
						modifiers: "Item Type: Medium Armor, AC: 15, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 750,
						weight: 40,
						amount: 1
					},
                    {
						desc: "Ring Mail (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Ring Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 14, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 30,
						weight: 40,
						amount: 1
					},
					{
						desc: "Chain Mail (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Chain Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 16, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 75,
						weight: 55,
						amount: 1
					},
					{
						desc: "Splint Mail (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Splint Mail)",
						modifiers: "Item Type: Heavy Armor, AC: 17, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 200,
						weight: 60,
						amount: 1
					},
					{
						desc: "Plate (very rare), requires attunement<br><br>This hideous armor is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.<br><br>While wearing this armor, you have a +1 bonus to Armor Class, and you have resistance to the following damage types: necrotic, poison, and psychic.<br><br>Symbiotic Nature. The armor can\'t be removed from you while you\'re attuned to it, and you can\'t voluntarily end your attunement to it. If you\'re targeted by a spell that ends a curse, your attunement to the armor ends, and it detaches from you.<br><br>The armor requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.",
						name: "Living Armor (Plate)",
						modifiers: "Item Type: Heavy Armor, AC: 18, AC +1, Stealth:Disadvantage",
						properties: "",
						price: 1500,
						weight: 65,
						amount: 1
					},
                    {
						desc: "Shield (very rare), requires attunement<br><br>This crystalline blue shield is fashioned from a sapphire dragon\'s scale and is created to aid in rooting out the influence of Aberrations. While wielding the shield, you have resistance to psychic and thunder damage. Also, when you take damage from a creature that is within 5 feet of you, you can use your reaction to deal 2d6 thunder damage to that creature.<br><br>As an action, you can use the shield to help you locate Aberrations until the end of your next turn. If any Aberrations are within 1 mile of you, the shield emits a low humming tone for a moment, and you know the direction of all Aberrations within that range. Once this property is used, it can\'t be used again until the next dawn.",
						name: "Sapphire Buckler",
						modifiers: "Item Type: Shield, AC: 2, Damage: 2d6, Damage Type: thunder",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (very rare)<br><br>While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield\'s normal bonus to AC.",
						name: "Shield +3",
						modifiers: "Item Type: Shield, AC: 2, AC +3",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					},
                    {
						desc: "Shield (very rare), requires attunement<br><br>While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you.",
						name: "Spellguard Shield",
						modifiers: "Item Type: Shield, AC: 2, Saving Throws:Advantage",
						properties: "",
						price: 10,
						weight: 6,
						amount: 1
					}
                ],
                accessoires: [
                    //Very Rare Accessoires (Rings, Rods, Staffs, Wearables)
                ],
                scroll: [
                    //Very Rare Scrolls    
                ],
                misc: [
                    //Very Rare misc Items (edibles & other things that don't belong in previous categories)
                ]
            },
            legendary: {
                weapon: [
                    //Legendary Weapons
                    {
                        desc: "Greatsword (legendary), requires attunement by a creature of non-lawful alignment<br><br>Hidden in the dungeon of White Plume Mountain, Blackrazor shines like a piece of night sky filled with stars. Its black scabbard is decorated with pieces of cut obsidian.<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the following additional properties.<br><br>Devour Soul. Whenever you use it to reduce a creature to 0 hit points, the sword slays the creature and devours its soul, unless it is a construct or an undead. A creature whose soul has been devoured by Blackrazor can be restored to life only by a Wish spell.<br><br>When it devours a soul, Blackrazor grants you temporary hit points equal to the slain creature's hit point maximum. These hit points fade after 24 hours. As long as these temporary hit points last and you keep Blackrazor in hand, you have advantage on attack rolls, saving throws, and ability checks.<br><br>If you hit an undead with this weapon, you take 1d10 necrotic damage and the target regains 1d10 hit points. If this necrotic damage reduces you to 0 hit points, Blackrazor devours your soul.<br><br>Soul Hunter. While you hold the weapon. you are aware of the presence of Tiny or larger creatures within 60 feet of you that aren\'t constructs or undead. You also can\'t be charmed or frightened.<br><br>Blackrazor can cast the Haste spell on you once per day. It decides when to cast the spell and maintains concentration on it so that you don\'t have to.<br><br>Sentience. Blackrazor is a sentient chaotic neutral weapon with an Intelligence of 17, a Wisdom of 10, and a Charisma of 19. It has hearing and darkvision out to a range of 120 feet.<br><br>The weapon can speak, read, and understand Common, and can communicate with its wielder telepathically. Its voice is deep and echoing. While you are attuned to it, Blackrazor also understands every language you know.<br><br>Personality. Blackrazor speaks with an imperious tone, as though accustomed to being obeyed. The sword\'s purpose is to consume souls. It doesn\'t care whose souls it eats, including the wielder\'s. The sword believes that all matter and energy sprang from a void of negative energy and will one day return to it. Blackrazor is meant to hurry that process along.<br><br>Despite its nihilism, Blackrazor feels a strange kinship to Wave and Whelm, two other weapons locked away under White Plume Mountain. It wants the three weapons to be united again and wielded together in combat, even though it violently disagrees with Whelm and finds Wave tedious.<br><br>Blackrazor\'s hunger for souls must be regularly fed. If the sword goes three days or more without consuming a soul, a conflict between it and its wielder occurs at the next sunset.",
                        name: "Blackrazor",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (legendary), requires attunement<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>The first time you attack with the sword on each of your turns, you can transfer some or all of the sword\'s bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain +2 to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
                        name: "Defender Greatsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>The first time you attack with the sword on each of your turns, you can transfer some or all of the sword\'s bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain +2 to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
                        name: "Defender Longsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (legendary), requires attunement<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>The first time you attack with the sword on each of your turns, you can transfer some or all of the sword\'s bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain +2 to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
                        name: "Defender Rapier",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (legendary), requires attunement<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>The first time you attack with the sword on each of your turns, you can transfer some or all of the sword\'s bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain +2 to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
                        name: "Defender Scimitar",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (legendary), requires attunement<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>The first time you attack with the sword on each of your turns, you can transfer some or all of the sword\'s bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain +2 to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
                        name: "Defender Shortsword",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (legendary), requires attunement<br><br>A dragonlance is a renowned weapon forged from rare metal with the aid of powerful artifacts associated with Bahamut. Different lances are forged for use by foot soldiers (as pikes) and by riders (as lances), but the magical properties of the weapons are the same.<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a Dragon with this weapon, the Dragon takes an extra 3d6 force damage, and any Dragon of your choice that you can see within 30 feet of you can immediately use its reaction to make a melee attack.",
                        name: "Dragonlance (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 3d6, Secondary Damage Type: force against dragons, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Pike (legendary), requires attunement<br><br>A dragonlance is a renowned weapon forged from rare metal with the aid of powerful artifacts associated with Bahamut. Different lances are forged for use by foot soldiers (as pikes) and by riders (as lances), but the magical properties of the weapons are the same.<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon.<br><br>When you hit a Dragon with this weapon, the Dragon takes an extra 3d6 force damage, and any Dragon of your choice that you can see within 30 feet of you can immediately use its reaction to make a melee attack.",
                        name: "Dragonlance (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 3d6, Secondary Damage Type: force against dragons, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Club (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Club)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "Light",
                        price: 0.1,
                        amount: 1,
                        weight: 2
                    },
                    {
                        desc: "Dagger (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Dagger)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatclub (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Greatclub)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "Two-Handed",
                        price: 0.2,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Handaxe (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Handaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Javelin (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Javelin)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 30/120",
                        properties: "Thrown",
                        price: 0.5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Light Hammer (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Light Hammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Light, Thrown",
                        price: 2,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Mace (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Mace)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Quarterstaff (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Quarterstaff)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: bludgeoning, Melee Damage +3, Melee Attacks +3, Range: 5 ft",
                        properties: "Versatile",
                        price: 0.2,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Sickle (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Sickle)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "Light",
                        price: 1,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Spear (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Spear)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +3, Melee Damage +3, Range: 20/60",
                        properties: "Thrown, Versatile",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Light Crossbow (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Light Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 80/320",
                        properties: "Ammunition, Loading, Two-Handed",
                        price: 25,
                        weight: 5,
                        amount: 1
                    },
                    {
                        desc: "Dart (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Dart)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 20/60",
                        properties: "Finesse, Thrown",
                        price: 0.05,
                        weight: 0.25,
                        amount: 1
                    },
                    {
                        desc: "Shortbow (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Shortbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 80/320",
                        properties: "Ammunition, Two-Handed",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Sling (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Sling)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d4, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 30/120",
                        properties: "Ammunition",
                        price: 0.1,
                        weight: 0,
                        amount: 1
                    },
                    {
                        desc: "Battleaxe (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Battleaxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s brath, Range: 5 ft., Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3",
                        properties: "Versatile",
                        price: 10,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Flail (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Flail)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft., Melee Attacks +3, Melee Damage +3",
                        properties: "",
                        price: 10,
                        weight: 2,
                        ammount: 1
                    },
                    {
                        desc: "Glaive (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Glaive)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Greataxe (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Greataxe)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 30,
                        weight: 7,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft.",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Halberd (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Halberd)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 10 ft.",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 20,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Lance (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Lance)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 10 ft.",
                        properties: "Reach, Special",
                        price: 10,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Maul (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Maul)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Morningstar (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Morningstar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "",
                        price: 15,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "Pike (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Pike)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 10 ft",
                        properties: "Heavy, Reach, Two-Handed",
                        price: 5,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Rapier (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Trident (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Trident)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Range: 20/60, Alternate Damage: 1d8, Alternate Damage Type: piercing, Melee Attacks +3, Melee Damage +3",
                        properties: "Thrown, Versatile",
                        price: 5,
                        weight: 4,
                        amount: 1
                    },
                    {
                        desc: "War Pick (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (War Pick)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "",
                        price: 5,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Warhammer (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Warhammer)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Range: 5 ft, Alternate Damage: 1d10, Alternate Damage Type: bludgeoning, Melee Attacks +3, Melee Damage +3",
                        properties: "Versatile",
                        price: 15,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Whip (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Whip)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 10 ft",
                        properties: "Finesse, Reach",
                        price: 2,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Blowgun (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Blowgun)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 25/100",
                        properties: "Ammunition, Loading",
                        price: 10,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Hand Crossbow (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Hand Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 30/120",
                        properties: "Ammunition, Light, Loading",
                        price: 75,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Heavy Crossbow (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Heavy Crossbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 100/400",
                        properties: "Ammunition, Heavy, Loading, Two-Handed",
                        price: 50,
                        weight: 18,
                        amount: 1
                    },
                    {
                        desc: "Longbow (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Longbow)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 150/600",
                        properties: "Ammunition, Heavy, Two-Handed",
                        price: 50,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Net (legendary), requires attunement<br><br>This weapon is decorated with dragon heads, claws, wings, scales, or Draconic letters. When it steeps in a dragon\'s hoard, it absorbs the energy of the dragon\'s breath weapon and deals damage of that type with its special properties.<br><br>The Ascendant weapon has the Slumbering property, and it improves on the Stirring and Wakened properties. The bonus to attack and damage rolls increases to +3, and the extra damage dealt by the weapon increases to 3d6.<br><br>The cone of destructive energy the weapon creates increases to a 60-foot cone, the save DC increases to 18, and the damage increases to 12d6.",
                        name: "Ascendant Dragon\'s Wrath Weapon (Net)",
                        modifiers: "Item Type: Ranged Weapon, Damage: 0, Secondary Damage: 12d6, Secondary Damage Type: dragon\'s breath, Ranged Attacks +3, Ranged Damage +3, Range: 5/15",
                        properties: "Thrown, Special",
                        price: 1,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Flail (legendary), requires attunement<br><br>This magic flail is made in the image of Tiamat, with five jagged heads shaped like the heads of five different chromatic dragons. You gain a +3 bonus to attack and damage rolls made with this flail. When you hit with an attack roll using it, the target takes an extra 5d4 damage of your choice of one of the following damage types: acid, cold, fire, lightning, or poison.<br><br>While holding the flail, you can use an action and speak a command word to cause the heads to breathe multicolored flames in a 90-foot cone. Each creature in that area must make a DC 18 Dexterity saving throw. On a failed save, it takes 14d6 damage of one of the following damage types (your choice): acid, cold, fire, lightning, or poison. On a successful save, it takes half as much damage. Once this action is used, it can\'t be used again until the next dawn.",
                        name: "Flail of Tiamat",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning, Secondary Damage: 5d4, Secondary Damage Type: acid\, cold\, fire\, lightning or poison, Range: 5 ft",
                        properties: "",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Maul (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon.<br><br>You must be wearing a Belt of Giant Strength (any variety) and Gauntlets of Ogre Power to attune to this weapon. The attunement ends if you take off either of those items. While you are attuned to this weapon and holding it, your Strength score increases by 4 and can exceed 20, but not 30. When you roll a 20 on an attack roll made with this weapon against a giant, the giant must succeed on a DC 17 Constitution saving throw or die.<br><br>The hammer also has 5 charges. While attuned to it, you can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the hammer unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it must succeed on a DC 17 Constitution saving throw or be stunned until the end of your next turn. The hammer regains 1d4 + 1 expended charges daily at dawn.",
                        name: "Hammer of Thunderbolts",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning, Melee Attacks +1, Melee Damage +1, Range: 5 ft, Strength +4",
                        properties: "Heavy, Two-Handed",
                        price: 10,
                        weight: 10,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
                        name: "Holy Avenger (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Melee Attacks +3, Melee Damage +3, Range: 5 ft, Saving Throws:Advantage",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
                        name: "Holy Avenger (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft, Saving Throws:Advantage",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
                        name: "Holy Avenger (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Melee Attacks +3, Melee Damage +3, Range: 5 ft, Saving Throws:Advantage",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
                        name: "Holy Avenger (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Melee Attacks +3, Melee Damage +3, Range: 5 ft, Saving Throws:Advantage",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
                        name: "Holy Avenger (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Melee Attacks +3, Melee Damage +3, Range: 5 ft, Saving Throws:Advantage",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.<br><br>If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.<br><br>The sword has 1d4- 1 charges. While holding it, you can use an action to expend 1 charge and cast the Wish spell from it. This property can\'t be used again until the next dawn. The sword loses this property if it has no charges.",
                        name: "Luck Blade (Greatsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Saving Throws +1, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.<br><br>If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.<br><br>The sword has 1d4- 1 charges. While holding it, you can use an action to expend 1 charge and cast the Wish spell from it. This property can\'t be used again until the next dawn. The sword loses this property if it has no charges.",
                        name: "Luck Blade (Longsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Saving Throws +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Rapier (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.<br><br>If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.<br><br>The sword has 1d4- 1 charges. While holding it, you can use an action to expend 1 charge and cast the Wish spell from it. This property can\'t be used again until the next dawn. The sword loses this property if it has no charges.",
                        name: "Luck Blade (Rapier)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Saving Throws +1, Range: 5 ft",
                        properties: "Finesse",
                        price: 25,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Scimitar (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.<br><br>If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.<br><br>The sword has 1d4- 1 charges. While holding it, you can use an action to expend 1 charge and cast the Wish spell from it. This property can\'t be used again until the next dawn. The sword loses this property if it has no charges.",
                        name: "Luck Blade (Scimitar)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Saving Throws +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 25,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Shortsword (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.<br><br>If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.<br><br>The sword has 1d4- 1 charges. While holding it, you can use an action to expend 1 charge and cast the Wish spell from it. This property can\'t be used again until the next dawn. The sword loses this property if it has no charges.",
                        name: "Luck Blade (Shortsword)",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Saving Throws +1, Range: 5 ft",
                        properties: "Finesse, Light",
                        price: 10,
                        weight: 2,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement by an elf or half-elf of neutral good alignment<br><br>Of all the magic items created by the elves, one of the most prized and jealously guarded is a moonblade. In ancient times, nearly all elven noble houses claimed one such blade. Over the centuries, some blades have faded from the world, their magic lost as family lines have become extinct. Other blades have vanished with their bearers during great quests. Thus, only a few of these weapons remain.<br><br>A moonblade passes down from parent to child. The sword chooses its bearer and remains bonded to that person for life. If the bearer dies, another heir can claim the blade. If no worthy heir exists, the sword lies dormant. It functions like a normal longsword until a worthy soul finds it and lays claim to its power.<br><br>A moonblade serves only one master at a time. The attunement process requires a special ritual in the throne room of an elven regent or in a temple dedicated to the elven gods.<br><br>A moonblade won\'t serve anyone it regards as craven, erratic, corrupt, or at odds with preserving and protecting elvenkind. If the blade rejects you, you make ability checks, attack rolls, and saving throws with disadvantage for 24 hours. If the blade accepts you, you become attuned to it and a new rune appears on the blade. You remain attuned to the weapon until you die or the weapon is destroyed.<br><br>A moonblade has one rune on its blade for each master it has served (typically 1d6 + 1). The first rune always grants a +1 bonus to attack and damage rolls made with this magic weapon. Each rune beyond the first grants the moonblade an additional property. The DM chooses each property or determines it randomly on the Moonblade Properties table.<br><br>Every moonblade seeks the advancement of elvenkind and elven ideals. Courage, loyalty, beauty, music, and life are all part of this purpose.<br><br>The weapon is bonded to the family line it is meant to serve. Once it has bonded with an owner who shares its ideals, its loyalty is absolute.<br><br>If a moonblade has a flaw, it is overconfidence. Once it has decided on an owner, it believes that only that person should wield it, even if the owner falls short of elven ideals.",
                        name: "Moonblade",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +1, Melee Damage +1, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Longsword (legendary), requires attunement by a paladin<br><br>You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.<br><br>While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.<br><br>Nepenthe is a sentient neutral evil weapon with an Intelligence of 10, a Wisdom of 8, and a Charisma of 18. It has hearing and darkvision out to a range of 60 feet. It can read and understand Elvish. It can also speak Elvish, but only through the voice of its wielder, with whom the sword can communicate telepathically.<br><br>In its lifetime, the sword has beheaded thousands of criminals, not all of whom were guilty of the crimes for which they were convicted. The sword cannot distinguish the guilty from the innocent. With each beheading, it hungers for more justice and blood. The sword is corrupt and irredeemable.",
                        name: "Nepenthe",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing, Secondary Damage: 2d10, Secondary Damage Type: radiant against fiends or undead, Alternate Damage: 1d10, Alternate Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Saving Throws:Advantage, Range: 5 ft",
                        properties: "Versatile",
                        price: 15,
                        weight: 3,
                        amount: 1
                    },
                    {
                        desc: "Dagger (legendary), requires attunement<br><br>You gain a +1 bonus to attack and damage rolls made with this magic weapon. Its blade is cruelly serrated, and its hilt resembles a demonic head and wings. Whenever you slay a creature with an attack using the dagger, the creature\'s soul is imprisoned inside the dagger, and that creature can be restored to life only by a Wish spell. The dagger can hold a maximum of five souls.<br><br>For each soul imprisoned in the dagger, your attacks with it deal an extra 1d4 necrotic damage on a hit. While the dagger is within 5 feet of you, your dreams are haunted by whispers from the trapped souls.<br><br>The dagger has the following additional properties.<br><br>As a bonus action, you can release any number of stored souls from the dagger to regain 1d10 hit points per soul released.<br><br>If the dagger holds five souls, you can use this property: As a reaction immediately after you hit a creature with the dagger and deal damage to that target, you can release all five souls. If the target now has fewer than 75 hit points, it must succeed on a DC 15 Constitution saving throw or die. If the target dies, you can\'t use this property again until you finish a long rest.",
                        name: "Rakdos Riteknife",
                        modifiers: "Item Type: Melee Weapon, Damage: 1d4, Damage Type: piercing, Melee Attacks +1, Melee Damage +1, Range: 20/60",
                        properties: "Finesse, Light, Thrown",
                        price: 2,
                        weight: 1,
                        amount: 1
                    },
                    {
                        desc: "Greatsword (legendary), requires attunement by a non-evil creature<br><br>You gain a +3 bonus to attack and damage rolls made with this magic vorpal sword. In addition, the weapon ignores resistance to slashing damage.<br><br>When you use this weapon to attack a creature that has at least one head and roll a 20 on the attack roll, you cut off one of the creature\'s heads. The creature dies if it can\'t survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, it doesn\'t have or need a head, it has legendary actions, or the DM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.<br><br>While attuned to Snicker-Snack, you have proficiency with greatswords, and you can use your Charisma modifier instead of your Strength modifier for attack and damage rolls made with the weapon.<br><br>Snicker-Snack is a sentient, chaotic good greatsword with an Intelligence of 9, a Wisdom of 14, and a Charisma of 18. It has hearing and darkvision out to a range of 120 feet. It can speak, read, and understand Common, and its voice sounds silvery and melodic. Snicker-Snack craves the destruction of evil Dragons and urges you to seek out these creatures and slay them.<br><br>Snicker-Snack has a fickle personality. It ends its attunement to you if you miss on attack rolls with the weapon three times in a row. Each time you finish a long rest after that happens, you can attempt to regain the sword's trust by making a contested Charisma check against Snicker-Snack. If you win the contest, your attunement to the weapon is instantly restored. Your attunement to the weapon can\'t be restored in any other way.",
                        name: "Snicker-Snack",
                        modifiers: "Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing, Melee Attacks +3, Melee Damage +3, Range: 5 ft",
                        properties: "Heavy, Two-Handed",
                        price: 50,
                        weight: 6,
                        amount: 1
                    }
                ],
                armor: [
                    //Legendary Armor
                ],
                accessoires: [
                    //Legendary Accessoires (Rings, Rods, Staffs, Wearables)
                ],
                scroll: [
                    //Legendary Scrolls    
                ],
                misc: [
                    //Legendary misc Items (edibles & other things that don't belong in previous categories)
                ]
            }
        };
    },
    
    handleInput = function(msg) {
        var args=msg.content.split(/\s+--/);
        if (msg.type!=="api") {
            return;
        }
        if (playerIsGM(msg.playerid)) {
            switch (args[0]) {
                case '!setdown':
                    setdown(args[1],args[2],args[3],msg);
                    downmenu(args[1],msg);
                    return;
                case '!setminbet':
                    let min=Number(String(args[1]).replace("amount ",""));
                    state.down.now.minprice=min;
                    downmenu(undefined,msg);
                    return;
                case '!setmaxbet':
                    let max=Number(String(args[1]).replace("amount ",""));
                    state.down.now.maxprice=max;
                    downmenu(undefined,msg);
                    return;
            }
        }
        switch (args[0]) {
            case '!down':
                downmenu(args[1],msg);
                return;
            case '!brewmenu':
                brewmenu(args[1],args[2],args[3],msg);
                return;
            case '!brew':
                brew(args[1],args[2],args[3],msg);
            case '!craftmenu':
                craftmenu(args[1],args[2],args[3],args[4],args[5],msg);
                return;
            case '!craft':
                craft(args[1],args[2],args[3],args[4],msg);
                return;
            case '!trainmenu':
                trainmenu(args[1],args[2],msg);
                return;
            case '!train':
                train(args[1],args[2],args[3],msg);
                return;
            case '!crimemenu':
                crimemenu(args[1],args[2],msg);
                return;
            case '!commit':
                crime(args[1],args[2],msg);
                return;
            case '!setitem':
                state.down.now.item=args[1];
                craftmenu(args[2],args[3],args[4],args[5],msg);
                return;
            case '!researchmenu':
                researchmenu(args[1],msg);
                return;
            case '!research':
                research(args[1],args[2],msg);
                return;
            case '!gamblemenu':
                gamblemenu(args[1],args[2],msg);
                return;
            case '!gamble':
                gamble(args[1],args[2],msg);
                return;
            case '!work':
                work(args[1],args[2],args[3],msg);
                return;
            case '!settrain':
                state.down.now.train=args[3];
                trainmenu(args[1],args[2],msg);
                return;
        }
    },
    
    downmenu = function(option,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let speakingName = msg.who;
        let char;
        if (option) {
            if (option.includes('sel')) {
                option.replace("sel","");
                option=msg.selected;
                let charid=getIDsFromTokens(option)[0];
                char=findObjs({
                    _type: 'character',
                    _id: charid
                })[0];
                if (char) {
                    if (playerIsGM(msg.playerid)) {
                        let name=char.get('name');
                        char.get('gmnotes',function(gmnotes) {
                            sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type ?{Player?|All|' + name + '} --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + gmnotes + '</a></td></tr>' + //--
                                '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                '</table>' + //--
                                '</div>'
                            );
                        });
                    } else {
                        char.get("gmnotes",function(gmnotes) {
                            if (gmnotes="") {
                                sendChat("Downtime","/w "+msg.who+" You do not have available Downtime!");
                            } else {
                                sendChat("Downtime","/w " + speakingName + " <div "+ divstyle + ">" + //--
                                    '<div ' + headstyle + '>Downtime</div>' + //--
                                    '<div ' + substyle + '>Menu</div>' + //--
                                    '<div ' + arrowstyle + '></div>' + //--
                                    '<table>' + //--
                                    'Downtime: ' + gmnotes + //--
                                    '</table>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;">Available Downtime Activities</div>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!brewmenu --charid ' + charid + ' --rarity ?{Type?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Brew Potion</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!craftmenu --charid ' + charid + ' --type ?{Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Craft Items</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!work --charid ' + charid + ' --skill ?{Skill?|Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival} --time ?{Time?|1}">Work</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!trainmenu --charid ' + charid + ' --type ?{Type?|Tool|Language}">Train</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!crimemenu --charid ' + charid + ' --type ?{Type?|Stealth|Thieves\' Tools|Investigation|Perception|Deception}">Commit Crime</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!researchmenu --charid ' + charid + ' --price 50">Research</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!gamblemenu --charid ' + charid + ' --amount ?{Amount?|10}">Gamble</a></div>' + //--
                                    '</div>'
                                );
                            }
                        });
                    }
                } else {
                    sendChat("Downtime","/w " + msg.who + " The selected character doesn\'t exist!");
                }
            } else if (option.includes('name')) {
                option.replace("name ","");
                char=findObjs({
                    _type: 'character',
                    name: option
                }, {caseInsensitive: true});
                if (char && char.length>1) {
                    sendChar("Downtime","/w "+msg.who+" Multiple Characters with the same name exist, please select the token and use >>!down --sel<< instead");
                } else if (char[0]) {
                    char=char[0];
                    if (playerIsGM(msg.playerid)) {
                        let name = char.get('name');
                        char.get('gmnotes',function(gmnotes) {
                            sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type ?{Player?|All|' + name + '} --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + gmnotes + '</a></td></tr>' + //--
                                '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                '</table>' + //--
                                '</div>'
                            );
                        });
                    } else {
                        let charid=char.get('_id');
                        char.get("gmnotes",function(gmnotes) {
                            let time=String(gmnotes);
                            if (time=="") {
                                sendChat("Downtime","/w "+msg.who+" You do not have available Downtime!");
                            } else {
                                sendChat("Downtime","/w " + speakingName + " <div "+ divstyle + ">" + //--
                                    '<div ' + headstyle + '>Downtime</div>' + //--
                                    '<div ' + substyle + '>Menu</div>' + //--
                                    '<div ' + arrowstyle + '></div>' + //--
                                    '<table>' + //--
                                    'Downtime: ' + time + //--
                                    '</table>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;">Available Downtime Activities</div>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!brewmenu --charid ' + charid + ' --rarity ?{Type?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Brew Potion</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!craftmenu --charid ' + charid + ' --type ?{Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Craft Items</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!work --charid ' + charid + ' --skill ?{Skill?|Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival} --time ?{Time?|1}">Work</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!trainmenu --charid ' + charid + ' --type ?{Type?|Tool|Language}">Train</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!crimemenu --charid ' + charid + ' --type ?{Type?|Stealth|Thieves\' Tools|Investigation|Perception|Deception}">Commit Crime</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!researchmenu --charid ' + charid + ' --price 50">Research</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!gamblemenu --charid ' + charid + ' --amount ?{Amount?|10}">Gamble</a></div>' + //--
                                    '</div>'
                                );
                            }
                        });
                    }
                }
            } else if (option.includes('charid')) {
                option.replace("charid ","");
                char=findObjs({
                    _type: 'character',
                    _id: option
                }, {caseInsensitive: true})[0];
                if (char) {
                    if (playerIsGM(msg.playerid)) {
                        let name = char.get('name');
                        char.get('gmnotes',function(gmnotes) {
                            sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type ?{Player?|All|' + name + '} --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + gmnotes + '</a></td></tr>' + //--
                                '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                '</table>' + //--
                                '</div>'
                            );
                        });
                    } else {
                        let charid=char.get('_id');
                        char.get("gmnotes",function(gmnotes) {
                            let time=String(gmnotes);
                            if (time=="") {
                                sendChat("Downtime","/w "+msg.who+" You do not have available Downtime!");
                            } else {
                                sendChat("Downtime","/w " + speakingName + " <div "+ divstyle + ">" + //--
                                    '<div ' + headstyle + '>Downtime</div>' + //--
                                    '<div ' + substyle + '>Menu</div>' + //--
                                    '<div ' + arrowstyle + '></div>' + //--
                                    '<table>' + //--
                                    'Downtime: ' + time + //--
                                    '</table>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;">Available Downtime Activities</div>' + //--
                                    '<br>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!brewmenu --charid ' + charid + ' --rarity ?{Type?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Brew Potion</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!craftmenu --charid ' + charid + ' --type ?{Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Craft Items</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!work --charid ' + charid + ' --skill ?{Skill?|Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival} --time ?{Time?|1}">Work</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!trainmenu --charid ' + charid + ' --type ?{Type?|Tool|Language}">Train</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!crimemenu --charid ' + charid + ' --type ?{Type?|Stealth|Thieves\' Tools|Investigation|Perception|Deception}">Commit Crime</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!researchmenu --charid ' + charid + ' --price 50">Research</a></div>' + //--
                                    '<div style="text-align:center;"><a ' + astyle2 + '" href="!gamblemenu --charid ' + charid + ' --amount ?{Amount?|10}">Gamble</a></div>' + //--
                                    '</div>'
                                );
                            }
                        });
                    }
                } else {
                    sendChat("Downtime","/w "+msg.who+" No Characters with the given ID exist!");
                }
            } else if (option.includes("type")) {
                option=option.replace("type ","");
                if (option=="All") {
                    if (state.down.now.time>1) {
                        sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                            '<div ' + headstyle + '>Downtime</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<table>' + //--
                            '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + state.down.now.substr + '</a></td></tr>' + //--
                            '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                            '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                            '</table>' + //--
                            '</div>'
                        );
                    } else {
                        sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                            '<div ' + headstyle + '>Downtime</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<table>' + //--
                            '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + '</a></td></tr>' + //--
                            '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                            '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                            '</table>' + //--
                            '</div>'
                        );
                    }
                } else if (option!=="All") {
                    option=option.replace("type ","");
                    let char=findObjs({
                        _type: 'character',
                        name: option
                    }, {caseInsensitive: true})[0];
                    if (char) {
                        if (playerIsGM(msg.playerid)) {
                            let name=option;
                            char.get('gmnotes',function(gmnotes) {
                                sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                    '<div ' + headstyle + '>Downtime</div>' + //--
                                    '<div ' + substyle + '>Menu</div>' + //--
                                    '<div ' + arrowstyle + '></div>' + //--
                                    '<table>' + //--
                                    '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type ?{Player?|All|' + name + '} --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + gmnotes + '</a></td></tr>' + //--
                                    '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                    '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                    '</table>' + //--
                                    '</div>'
                                );
                            });
                        }
                    } else {
                        if (state.down.now.time>1) {
                            sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + state.down.now.substr + '</a></td></tr>' + //--
                                '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                '</table>' + //--
                                '</div>'
                            );
                        } else {
                            sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + '</a></td></tr>' + //--
                                '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                                '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                                '</table>' + //--
                                '</div>'
                            );
                        }
                    }
                }
            }
        } else {
            if (playerIsGM(msg.playerid)) {
                let char=findObjs({
                    _type: 'character',
                    name: msg.who
                }, {caseInsensitive: true})[0];
                if (char) {
                    let name = char.get('name');
                    char.get('gmnotes',function(gmnotes) {
                        let time=gmnotes;
                        sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                            '<div ' + headstyle + '>Downtime</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<table>' + //--
                            '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type ?{Player?|All|' + name + '} --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + time + '</a></td></tr>' + //--
                            '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                            '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                            '</table>' + //--
                            '</div>'
                        );
                    });
                } else {
                    if (state.down.now.time>1) {
                        sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                            '<div ' + headstyle + '>Downtime</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<table>' + //--
                            '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + state.down.now.substr + '</a></td></tr>' + //--
                            '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                            '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                            '</table>' + //--
                            '</div>'
                        );
                    } else {
                        sendChat("Downtime","/w gm <div "+ divstyle + ">" + //--
                            '<div ' + headstyle + '>Downtime</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<table>' + //--
                            '<tr><td>Downtime: </td><td><a ' + astyle1 + '" href="!setdown --type All --amount ?{Amount?|1} --timetype ?{Type?|Day|Week|Month|Year}">' + state.down.now.time + " " + state.down.now.type + '</a></td></tr>' + //--
                            '<tr><td>Min Bet: </td><td><a ' + astyle1 + '" href="!setminbet --amount ?{Amount?|10}">' + state.down.now.minprice + ' GP</a></td></tr>' + //--
                            '<tr><td>Max Bet: </td><td><a ' + astyle1 + '" href="!setmaxbet --amount ?{Amount?|1000}">' + state.down.now.maxprice + ' GP</a></td></tr>' + //--
                            '</table>' + //--
                            '</div>'
                        );
                    }
                }
            } else {
                let char = findObjs({
                    _type: 'character',
                    name: msg.who
                }, {caseInsensitive: true})[0];
                if (char) {
                    let charid=char.get('_id');
                    char.get("gmnotes",function(gmnotes) {
                        let time=String(gmnotes);
                        if (time=="") {
                            sendChat("Downtime","/w "+msg.who+" You do not have available Downtime!");
                        } else {
                            sendChat("Downtime","/w " + speakingName + " <div "+ divstyle + ">" + //--
                                '<div ' + headstyle + '>Downtime</div>' + //--
                                '<div ' + substyle + '>Menu</div>' + //--
                                '<div ' + arrowstyle + '></div>' + //--
                                '<table>' + //--
                                'Downtime: ' + time + //--
                                '</table>' + //--
                                '<br>' + //--
                                '<div style="text-align:center;">Available Downtime Activities</div>' + //--
                                '<br>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!brewmenu --charid ' + charid + ' --rarity ?{Type?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Brew Potion</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!craftmenu --charid ' + charid + ' --type ?{Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ?{Amount?|1}">Craft Items</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!work --charid ' + charid + ' --skill ?{Skill?|Acrobatics|Animal Handling|Arcana|Athletics|Deception|History|Insight|Intimidation|Investigation|Medicine|Nature|Perception|Performance|Persuasion|Religion|Sleight of Hand|Stealth|Survival} --time ?{Time?|1}">Work</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!trainmenu --charid ' + charid + ' --type ?{Type?|Tool|Language}">Train</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!crimemenu --charid ' + charid + ' --type ?{Type?|Stealth|Thieves\' Tools|Investigation|Perception|Deception}">Commit Crime</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!research --charid ' + charid + ' --price 50">Research</a></div>' + //--
                                '<div style="text-align:center;"><a ' + astyle2 + '" href="!gamblemenu --charid ' + charid + ' --amount ?{Amount?|10}">Gamble</a></div>' + //--
                                '</div>'
                            );
                        }
                    });
                } else {
                    sendChat("Downtime","/w "+msg.who+" Please select a character either as the one you're speaking as or by using one of these Options:<br>--sel (select the character token)<br>--name {Character Name}<br>--charid {Character ID}");
                }
            }
        }
    },
    
    createHandout = function(charid,msg) {
        let char=findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        if (char) {
            let playerid = char.get('controlledby');
            let existing=findObjs({
                _type: 'handout',
            });
            let count=0;
            let multiple=false;
            let handid;
            _.each(existing,function(handout) {
                let name=handout.get('name');
                if (name.includes("Downtime Activities") && name.includes(char.get('name'))) {
                    count=Number(name.replace("Downtime Activities of "+char.get('name')+" #",""));
                    if (name.includes(String(count))) {
                        handid=handout.get('_id');
                    }
                }
            })
            if (count==0) {
                count=1;
            } else {
                count+=1;
            }
            char.get('gmnotes',function(gmnotes) {
                let notes=gmnotes;
                let handout=createObj('handout',{
                    name: 'Downtime Activities of '+char.get('name')+" #"+count,
                    inplayerjournals: playerid,
                    controlledby: msg.playerid,
                });
                handout.set('notes',"Total Downtime: "+notes);
            });
        }
    },
    
    setHandoutDesc = function(playerid,num,description) {
        num=Number(num);
        let handout=findObjs({
            _type: 'handout',
        });
        let id;
        _.each(handout,function(object) {
            let name=object.get('name');
            let injournal=object.get('inplayerjournals');
            if (name.includes("Downtime Activities")) {
                if (name.includes(String(num))) {
                    if (injournal.includes(playerid)) {
                        id=object.get('_id');
                    }
                } else {
                    sendChat("Downtime","/w gm A Handout with that Number does not exist!");
                }
            }
        });
        handout=findObjs({
            _type: 'handout',
            _id: id
        })[0];
        handout.get("notes",function(notes) {
            let nnotes=String(notes)+description;
            let newHand=createObj('handout',{
                name: handout.get('name'),
                inplayerjournals: handout.get('inplayerjournals'),
                controlledby: handout.get("controlledby")
            });
            newHand.set("notes",nnotes);
        });
        handout.remove();
    },
    
    getHandoutNum = function(playerid,charid) {
        let handout=findObjs({
            _type: 'handout',
        });
        let char=findObjs({
            _type: 'character',
            _id: charid
        })[0];
        let num;
        _.each(handout,function(object) {
            let name=object.get('name');
            let injournal=object.get('inplayerjournals');
            if ((name.includes("Downtime Activities") && name.includes(char.get('name')))&&String(injournal).includes(playerid)) {
                num=Number(name.replace("Downtime Activities of "+char.get('name')+" #",""));
            }
        });
        log(num);
        return num;
    },
    
    getIDsFromTokens = function (selected) {
		return (selected || []).map(obj => getObj("graphic", obj._id))
			.filter(x => !!x)
			.map(token => token.get("represents"))
			.filter(id => getObj("character", id || ""));
	},
    
    setdown = function(player,amount,type,msg) {
        amount=Number(amount.replace("amount ",""));
        type=type.replace("timetype ","");
        player=player.replace("type ","");
        if (player=="All") {
            state.down.now.time=amount;
            state.down.now.type=type;
            let characters=findObjs({
                _type: 'character'
            });
            var realamount=0;
            switch (type) {
                case 'Week':
                    realamount+=amount*7;
                    break;
                case 'Month':
                    realamount+=amount*30;
                    break;
                case 'Year':
                    realamount+=amount*360;
                    break;
                case 'Day':
                    realamount=amount;
                    break;
            }
            _.each(characters,function(attr) {
                if (attr.get('inplayerjournals')!=="") {
                    if (realamount>1) {
                        attr.set('gmnotes',realamount+" Days");
                    } else if (realamount==1) {
                        attr.set('gmnotes',realamount+" Day");
                    } else {
                        attr.set('gmnotes',"");
                    }
                    let id=attr.get('_id');
                    createHandout(id,msg);
                }
            });
        } else {
            let char=findObjs({
                _type: 'character',
                name: player
            }, {caseInsensitive: true})[0];
            let id=char.get('_id');
            var realamount=0;
            switch (type) {
                case 'Week':
                    realamount+=amount*7;
                    break;
                case 'Month':
                    realamount+=amount*30;
                    break;
                case 'Year':
                    realamount+=amount*360;
                    break;
                case 'Day':
                    realamount=amount;
                    break;
            }
            if (realamount>1) {
                char.set('gmnotes',realamount+" Days");
            } else if (realamount==1) {
                char.set('gmnotes',realamount+" Day");
            } else {
                char.set('gmnotes',"");
            }
            createHandout(id,msg);
        }
    },
    
    brewmenu = function(charid,type,amount,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let potionlist;
        let price;
        let time;
        type=type.replace("rarity ","");
        charid=charid.replace("charid ","");
        amount=Number(amount.replace("amount ",""));
        switch (type) {
            case 'Common':
                potionlist="Potion of Climbing,Potion of Healing";
                time=1;
                price=25;
                break;
            case 'Uncommon':
                potionlist="Oil of Slipperiness,Philter of Love,Potion of Advantage,Potion of Animal Friendship,Potion of Fire Breath,Potion of Hill Giant Strength,Potion of Growth,Potion of Healing (Greater),Potion of Poison,Potion of Resistance,Potion of Water Breathing";
                time=5;
                price=100;
                break;
            case 'Rare':
                potionlist="Elixir of Health,Oil of Etherealness,Potion of Aqueous Form,Potion of Clairvoyance,Potion of Diminution,Potion of Gaseous Form,Potion of Frost Giant Strength,Potion of Stone Giant Strength,Potion of Fire Giant Strength,Potion of Cloud Giant Strength,Potion of Healing (Superior),Potion of Heroism,Potion of Invulnerability,Potion of Maximum Power,Potion of Mind Control (Beast),Potion of Mind Control (Humanoid),Potion of Mind Reading";
                time=25;
                price=1000;
                break;
            case 'Very Rare':
                potionlist="Oil of Sharpness,Potion of Flying,Potion of Healing (Supreme),Potion of Invisibility,Potion of Longevity,Potion of Mind Control (Monster),Potion of Possibility,Potion of Speed,Potion of Vitality";
                time=60;
                price=10000;
                break;
            case 'Legendary':
                potionlist="Potion of Dragon\'s Majesty,Potion of Storm Giant Strength";
                time=125;
                price=50000;
                break;
        }
        let list;
        for (let i=0;i<15;i++) {
            list=potionlist.replace(',','|');
        }
        time*=amount;
        price*=amount;
        let char=findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        char.get("gmnotes",function(gmnotes){
            let ntime=gmnotes.replace(" Days","");
            if (Number(ntime)<time) {
                sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!");
            } else {
                let gold=findObjs({
                    _type: 'attribute',
                    _characterid: charid,
                    _name: "gp"
                }, {caseInsensitive: true})[0];
                let cur=gold.get('current');
                if (Number(cur)<price) {
                    sendChat("Downtime","/w "+msg.who+" You do not have enough money to do that!");
                } else {
                    sendChat("Downtime","/w "+msg.who+" <div " + divstyle + ">" + //--
                        '<div ' + headstyle + '>Brewing</div>' + //--
                        '<div ' + substyle + '>Menu</div>' + //--
                        '<div ' + arrowstyle + '></div>' + //--
                        '<table>' + //--
                        '<tr><td>Rarity: </td><td><a ' + astyle1 + '" href="!brewmenu --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ' + amount + '">' + type + '</a></td></tr>' + //--
                        '<tr><td>Potion: </td><td><a ' + astyle1 + '" href="!setpotion --potion ?{Potion?|' + list + '} --type ' + type + ' --amount ' + amount + '">' + state.down.now.potion + '</a></td></tr>' + //--
                        '<tr><td>Amount: </td><td><a ' + astyle1 + '" href="!brewmenu --rarity ' + type + ' --amount ?{Amount?|1}">' + amount + '</a></td></tr>' + //--
                        '</table>' + //--
                        '<br>Price: ' + price + ' GP<br>' + //--
                        'Time needed: ' + time + ' Days<br>' + //--
                        '<div style="text-align:center;"><a ' + astyle2 + '" href="!brew --potion ' + state.down.now.potion + ' --amount ' + amount + '">Brew Potion</a></div>' + //--
                        '</div>'
                    );
                }
            }
        })
    },
    
    brew = function(charid,potion,amount,msg) {
        charid=charid.replace("charid ","");
        let char=findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        let gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: "gp"
        }, {caseInsensitive: true})[0];
        let description;
        let modifiers="Item Type: Potion";
        let price;
        let neededtime;
        switch (potion) {
            case 'Potion of Climbing':
                description="When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.";
                price=25;
                time=2;
                break;
            case 'Potion of Healing':
                description="When you drink this potion, you regain 2d4 + 2 Hit Points.";
                modifiers+=", Damage: 2d4+2,Damage Type: Healing";
                price=25;
                time=2;
                break;
            case 'Oil of Slipperiness':
                description="This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a Freedom of Movement spell for 8 hours.\nAlternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.";
                price=100;
                time=5;
                break;
            case 'Philter of Love':
                description="The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.";
                price=100;
                time=5;
                break;
            case 'Potion of Advantage':
                description="When you drink this potion, you gain advantage on one ability check, attack roll, or saving throw of your choice that you make within the next hour.<br> This potion takes the form of a sparkling, golden mist that moves and pours like water";
                price=100;
                time=5;
                break;
            case 'Potion of Animal Friendship':
                description="When you drink this potion, you can cast the Animal Friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.";
                price=100;
                time=5;
                break;
            case 'Potion of Fire Breath':
                description="After drinking this potion, you can use a bonus action to exhale fire at a target within 30 feet of you. The target must make a DC 13 Dexterity saving throw, taking 4d6 fire damage on a failed save, or half as much damage on a successful one. The effect ends after you exhale the fire three times or when 1 hour has passed.<br>This potion\'s orange liquid flickers, and smoke fills the top of the container and wafts out whenever it is opened.";
                price=100;
                time=5;
                break;
            case 'Potion of Hill Giant Strength':
                description="When you drink this potion, your Strength score changes to 21 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=100;
                time=5;
                break;
            case 'Potion of Growth':
                description="When you drink this potion, you gain the enlarge effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny beat to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.";
                price=100;
                time=5;
                break;
            case 'Potion of Healing (Greater)':
                potion="Potion of Greater Healing";
                modifiers+=", Damage: 4d4+4,Damage Type: Healing";
                description="You regain 4d4 + 4 hit points when you drink this potion.";
                price=100;
                time=5;
                break;
            case 'Potion of Poison':
                description="This concoction looks, smells, and tastes like a Potion of Healing or other beneficial potion. However, it is actually poison masked by illusion magic. An Identify spell reveals its true nature.<br><br> If you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be poisoned. At the start of each of your turns while you are poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0.";
                modifiers+=", Damage: 3d6, Damage Type: Poison";
                price=100;
                time=5;
                break;
            case 'Potion of Resistance':
                description="When you drink this potion, you gain resistance to one type of damage for 1 hour. The DM chooses the type or determines it randomly.";
                price=100;
                time=5;
                break;
            case 'Potion of Water Breathing':
                description="You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.";
                price=100;
                time=5;
                break;
            case 'Elixir of Health':
                description="When you drink this potion, it cures any disease afflicting you, and it removes the blinded, deafened, paralyzed, and poisoned conditions. The clear red liquid has tiny bubbles of light in it.";
                price=1000;
                time=25;
                break;
            case 'Oil of Etherealness':
                description="Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour.";
                price=1000;
                time=25;
                break;
            case 'Potion of Aqueous Form':
                description="When you drink this potion, you transform into a pool of water. You return to your true form after 10 minutes or if you are incapacitated or die. You\'re under the following effects while in this form:<br><br> Liquid Movement. You have a swimming speed of 30 feet. You can move over or through other liquids. You can enter and occupy the space of another creature. You can rise up to your normal height, and you can pass through even Tiny openings. You extinguish nonmagical flames in any space you enter.<br><br> Watery Resilience. You have resistance to nonmagical damage. You also have advantage on Strength, Dexterity, and Constitution saving throws.<br><br> Limitations. You can\'t talk, attack, cast spells, or activate magic items. Any objects you were carrying or wearing meld into your new form and are inaccessible, though you continue to be affected by anything you\'re wearing, such as armor.";
                price=1000;
                time=25;
                break;
            case 'Potion of Clairvoyance':
                description="When you drink this potion, you gain the effect of the Clairvoyance spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.";
                break;
            case 'Potion of Diminution':
                description="When you drink this potion, you gain the reduce effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion\'s liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process";
                break;
            case 'Potion of Gaseous Form':
                description="When you drink this potion, you gain the effect of the Gaseous Form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water";
                price=1000;
                time=25;
                break;
            case 'Potion of Frost Giant Strength':
                description="When you drink this potion, your Strength score changes to 23 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=1000;
                time=25;
                break;
            case 'Potion of Stone Giant Strength':
                description="When you drink this potion, your Strength score changes to 23 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=1000;
                time=25;
                break;
            case 'Potion of Fire Giant Strength':
                description="When you drink this potion, your Strength score changes to 25 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=1000;
                time=25;
                break;
            case 'Potion of Cloud Giant Strength':
                description="When you drink this potion, your Strength score changes to 27 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=1000;
                time=25;
                break;
            case 'Potion of Healing (Superior)':
                potion="Potion of Superior Healing";
                modifiers+=", Damage: 8d4+8,Damage Type: Healing";
                description="You regain 8d4 + 8 hit points when you drink this potion.";
                price=1000;
                time=25;
                break;
            case 'Potion of Heroism':
                description="For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the Bless spell (no concentration required). This blue potion bubbles and steams as if boiling.";
                price=1000;
                time=25;
                break;
            case 'Potion of Invulnerability':
                description="For 1 minute after you drink this potion, you have resistance to all damage. The potion\'s syrupy liquid looks like liquified iron.";
                price=1000;
                time=25;
                break;
            case 'Potion of Maximum Power':
                description="The first time you cast a damage-dealing spell of 4th level or lower within 1 minute after drinking the potion, instead of rolling dice to determine the damage dealt, you can instead use the highest number possible for each die.";
                price=1000;
                time=25;
                break;
            case 'Potion of Mind Control (Beast)':
                description="When you drink a Potion of Mind Control, you can cast a Dominate Beast spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don\'t, the potion is wasted.";
                price=1000;
                time=25;
                break;
            case 'Potion of Mind Control (Humanoid)':
                description="When you drink a Potion of Mind Control, you can cast a Dominate Person spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don\'t, the potion is wasted.";
                price=1000;
                time=25;
                break;
            case 'Potion of Mind Reading':
                description="When you drink this potion, you gain the effect of the Detect Thoughts spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it.";
                price=1000;
                time=25;
                break;
            case 'Oil of Sharpness':
                description="This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.";
                price=10000;
                time=60;
                break;
            case 'Potion of Flying':
                description="When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.";
                price=10000;
                time=60;
                break;
            case 'Potion of Healing (Supreme)':
                potion="Potion of Supreme Healing";
                modifiers+=", Damage: 10d4+20,Damage Type: Healing";
                description="You regain 10d4 + 20 hit points when you drink this potion.";
                price=10000;
                time=60;
                break;
            case 'Potion of Invisibility':
                description="This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell.";
                price=10000;
                time=60;
                break;
            case 'Potion of Longevity':
                description="When you drink this potion, your physical age is reduced by 1d6 + 6 years, to a minimum of 13 years. Each time you subsequently drink a potion of longevity, there is a 10 percent cumulative chance that you instead age by 1d6 + 6 years. Suspended in this amber liquid are a scorpion\'s tail, an adder's fang, a dead spider, and a tiny heart that, against all reason, is still beating. These ingredients vanish when the potion is opened.";
                price=10000;
                time=60;
                break;
            case 'Potion of Mind Control (Monster)':
                description="When you drink a Potion of Mind Control, you can cast a Dominate Monster spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don\'t, the potion is wasted.";
                price=10000;
                time=60;
                break;
            case 'Potion of Possibility':
                description="When you drink this clear potion, you gain two Fragments of Possibility, each of which looks like a Tiny, grayish bead of energy that follows you around, staying within 1 foot of you at all times. Each fragment lasts for 8 hours or until used.<br><br> When you make an attack roll, an ability check, or a saving throw, you can expend your fragment to roll an additional d20 and choose which of the d20s to use. Alternatively, when an attack roll is made against you, you can expend your fragment to roll a d20 and choose which of the d20s to use, the one you rolled or the one the attacker rolled.<br><br> If the original d20 roll has advantage or disadvantage, you roll your d20 after advantage or disadvantage has been applied to the original roll.<br><br> While you have one or more Fragments of Possibility from this potion, you can\'t gain another Fragment of Possibility from any source.";
                price=10000;
                time=60;
                break;
            case 'Potion of Speed':
                description="When you drink this potion, you gain the effect of the Haste spell for 1 minute (no concentration required). The potion\'s yellow fluid is streaked with black and swirls on its own.";
                price=10000;
                time=60;
                break;
            case 'Potion of Vitality':
                description="When you drink this potion, it removes any exhaustion you are suffering and cures any disease or poison affecting you. For the next 24 hours, you regain the maximum number of hit points for any Hit Die you spend. The potion\'s crimson liquid regularly pulses with dull light, calling to mind a heartbeat.";
                price=10000;
                time=60;
                break;
            case 'Potion of Dragon\'s Majesty':
                description="This potion looks like liquid gold, with a single scale from a chromatic, gem, or metallic dragon suspended in it. When you drink this potion, you transform into an adult dragon of the same kind as the dragon the scale came from. The transformation lasts for 1 hour. Any equipment you are wearing or carrying melds into your new form or falls to the ground (your choice). For the duration, you use the game statistics of the adult dragon instead of your own, but you retain your languages, personality, and memories. You can\’t use a dragon\’s Change Shape or its legendary or lair actions.";
                price=50000;
                time=125;
                break;
            case 'Potion of Storm Giant Strength':
                description="When you drink this potion, your Strength score changes to 29 for 1 hour. This potion has no effect on you if your Strength is equal to or greater than that score.<br><br> This potion\'s transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.";
                price=50000;
                time=125;
                break;
        }
        let cur=gold.get('current');
        cur=Number(cur)-price;
        gold.set('current',cur);
        char.get("gmnotes",function(gmnotes) {
            let ntime=Number(gmnotes.replace(' Days',''));
            ntime-=time;
            let notes="";
            if (ntime>0) {
                if (ntime>1) {
                    notes+=String(time)+" Days";
                } else {
                    notes+=String(time)+" Day";
                }
            }
            char.set("gmnotes",notes);
            return;
        });
        let inventory=findObjs({
            _type: 'attribute',
            _characterid: charid
        });
        let row=-1;
        let itemid;
        let rownum;
        let count;
        _.each(inventory,function(object) {
            let name = object.get('_name');
            if (name.includes('repeating_inventory')) {
                if (name.includes('_itemname')) {
                    row+=1;
                    if (object.get('current')==potion) {
                        let test=name.replace("repeating_inventory_","");
                        test=test.replace("_itemname","");
                        itemid=test;
                        rownum=row;
                    }
                }
            }
        });
        _.each(inventory,function(object) {
            let name=object.get('_name');
            if (name.includes('_itemcount')) {
                let test=name.replace("repeating_inventory_","");
                test=test.replace("_itemcount","");
                if (test==itemid) {
                    count=object.get('current');
                }
            }
        });
        if (itemid) {
            if (count) {
                amount=Number(amount)+Number(count);
            }
            sendChat("Downtime","!setattr --charid "+charid+" --repeating_inventory_"+itemid+"_itemcount|"+amount);
        } else {
            sendChat("Downtime","!setattr --charid "+charid+" --repeating_inventory_-CREATE_itemname|"+potion+" --repeating_inventory_-CREATE_itemcount|"+amount+" --repeating_inventory_-CREATE_itemcontent|"+description+" --repeating_inventory_-CREATE_itemmodifiers|"+modifiers+" --repeating_inventory_-CREATE_itemweight|0");
            if (potion=="Potion of Healing") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|"+potion+" --repeating_attack_-CREATE_dmgbase|2d4+2 --repeating_attack_-CREATE_dmgtype|Healing --repeating_attack_-CREATE_atkflag|0");
            } else if (potion=="Potion of Greater Healing") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|"+potion+" --repeating_attack_-CREATE_dmgbase|4d4+4 --repeating_attack_-CREATE_dmgtype|Healing --repeating_attack_-CREATE_atkflag|0");
            } else if (potion=="Potion of Poison") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|"+potion+" --repeating_attack_-CREATE_dmgbase|3d6 --repeating_attack_-CREATE_dmgtype|Poison --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Constitution --repeating_attack_-CREATE_saveflat|13 --repeating_attack_-CREATE_saveeffect|Damage reduced by 1d6");
            } else if (potion=="Potion of Superior Healing") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|"+potion+" --repeating_attack_-CREATE_dmgbase|8d4+8 --repeating_attack_-CREATE_dmgtype|Healing --repeating_attack_-CREATE_atkflag|0");
            } else if (potion=="Potion of Supreme Healing") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|"+potion+" --repeating_attack_-CREATE_dmgbase|10d4+20 --repeating_attack_-CREATE_dmgtype|Healing --repeating_attack_-CREATE_atkflag|0");
            } else if (potion=="Potion of Fire Breath") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|Fire Breath --repeating_attack_-CREATE_dmgbase|4d6 --repeating_attack_-CREATE_dmgtype|Fire --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Dexterity --repeating_attack_-CREATE_saveflat|13 --repeating_attack_-CREATE_saveeffect|Half Damage");
            } else if (potion=="Potion of Mind Control (Beast)") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|Dominate Beast --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Wisdom --repeating_attack_-CREATE_saveflat|15 --repeating_attack_-CREATE_saveeffect|No effect");
            } else if (potion=="Potion of Mind Control (Humanoid)") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|Dominate Person --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Wisdom --repeating_attack_-CREATE_saveflat|15 --repeating_attack_-CREATE_saveeffect|No effect");
            } else if (potion=="Potion of Mind Control (Monster)") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|Dominate Monster --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Wisdom --repeating_attack_-CREATE_saveflat|15 --repeating_attack_-CREATE_saveeffect|No effect");
            } else if (potion=="Potion of Mind Reading") {
                sendChat("Downtime","!setattr --charid "+charid+" --repeating_attack_-CREATE_atkname|Detect Thoughts --repeating_attack_-CREATE_atkflag|0 --repeating_attack_-CREATE_saveattr|Wisdom --repeating_attack_-CREATE_saveflat|13 --repeating_attack_-CREATE_saveeffect|No effect");
            }
        }
        let handnum=getHandoutNum(msg.playerid,charid);
        let name = char.get("name");
        let desc="<br><br>"+name+" spends "+time+" Days and "+price+" GP crafting "+amount+"x "+potion
        setHandoutDesc(msg.playerid,handnum,desc);
        sendChat("Downtime","/w "+msg.who+" You craft "+amount+" "+potion);
    },

    craftmenu = function(charid,type,rarity,amount,msg) {
        let itemlist;
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let price;
        let neededtime;
        type=type.replace("type ","")
        charid=charid.replace("charid ","");
        rarity=rarity.replace("rarity ","")
        amount=Number(amount.replace("amount ",""));
        switch (rarity) {
            case 'Common':
                price=50;
                neededtime=5;
                if (type=="Weapon") {
                    itemlist=state.List.common.weapon;
                } else if (type=="Armor") {
                    itemlist=state.List.common.armor;
                } else if (type=="Accessoires") {
                    itemlist=state.List.common.accessoires;
                } else if (type=="Scroll") {
                    itemlist=state.List.common.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemlist=state.List.common.misc;
                }
                break;
            case 'Uncommon':
                price=200;
                neededtime=10;
                if (type=="Weapon") {
                    itemlist=state.List.uncommon.weapon;
                } else if (type=="Armor") {
                    itemlist=state.List.uncommon.armor;
                } else if (type=="Accessoires") {
                    itemlist=state.List.uncommon.accessoires;
                } else if (type=="Scroll") {
                    itemlist=state.List.uncommon.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemlist=state.List.uncommon.misc;
                }
                break;
            case 'Rare':
                price=2000;
                neededtime=50;
                if (type=="Weapon") {
                    itemlist=state.List.rare.weapon;
                } else if (type=="Armor") {
                    itemlist=state.List.rare.armor;
                } else if (type=="Accessoires") {
                    itemlist=state.List.rare.accessoires;
                } else if (type=="Scroll") {
                    itemlist=state.List.rare.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemlist=state.List.rare.misc;
                }
                break;
            case 'Very Rare':
                price=20000;
                neededtime=125;
                if (type=="Weapon") {
                    itemlist=state.List.very_rare.weapon;
                } else if (type=="Armor") {
                    itemlist=state.List.very_rare.armor;
                } else if (type=="Accessoires") {
                    itemlist=state.List.very_rare.accessoires;
                } else if (type=="Scroll") {
                    itemlist=state.List.very_rare.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemlist=state.List.very_rare.misc;
                }
                break;
            case 'Legendary':
                price=100000;
                neededtime=250;
                if (type=="Weapon") {
                    itemlist=state.List.legendary.weapon;
                } else if (type=="Armor") {
                    itemlist=state.List.legendary.armor;
                } else if (type=="Accessoires") {
                    itemlist=state.List.legendary.accessoires;
                } else if (type=="Scroll") {
                    itemlist=state.List.legendary.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemlist=state.List.legendary.misc;
                }
                break;
        }
        let item = itemlist.find(e => e.name.toLowerCase().includes(state.down.now.item.toLowerCase()));
        if (item) {
            price+=Number(item.price);
        }
        let firstlist=""
        for (let i=0;i<itemlist.length;i++) {
            firstlist=firstlist+itemlist[i].name+",";
        }
        firstlist=firstlist.split(",");
        let secondlist=[]
        for (let i=0;i<firstlist.length;i++) {
            if (firstlist[i]!=="") {
                secondlist[i]=firstlist[i];
            }
        }
        for (let i=0;i<50;i++) {
            secondlist=String(secondlist).replace(",","|");
        }
        let list=secondlist;
        let char = findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        char.get("gmnotes",function(gmnotes) {
            let time=Number(String(gmnotes.replace(" Day","")).replace("s",""));
            if (time<neededtime) {
                sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!");
            } else {
                let gold=findObjs({
                    _type: 'attribute',
                    _characterid: charid,
                    _name: 'gp'
                }, {caseInsensitive: true})[0]
                let cur=gold.get('current');
                if (cur<price) {
                    sendChat("Downtime","/w "+msg.who+" You do not have enough money to do that!");
                } else {
                    let test=false;
                    itemlist.forEach(element => {
                        if (element.name==state.down.now.item) {
                            test=true;
                            state.down.now.item=element.name;
                        }
                    });
                    if (test==false) {
                        state.down.now.item="";
                    }
                    if (type=="Weapon" || type=="Scroll") {
                        sendChat("Downtime","/w "+msg.who+" <div " + divstyle + ">" + //--
                            '<div ' + headstyle + '>Crafting</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<div style="text-align:center;">Available ' + type + "s" + //--
                            '<table>' + //--
                            '<tr><td>Rarity: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ' + amount + '">' + rarity + '</a></td></tr>' + //--
                            '<tr><td>Item Type: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ?{Item Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ' + rarity + ' --amount ' + amount + '">' + type + '</a></td></tr>' + //--
                            '<tr><td>Amount: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ?{Amount?|1}">' + amount + '</a></td></tr>' + //--
                            '<tr><td>Item: </td><td><a ' + astyle1 + '" href="!setitem --item ?{Item?|' + list + '} --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">' + state.down.now.item + '</a></td></tr>' + //--
                            '</table>' + //--
                            '<div style="text-align:center;">Price: ' + price + ' GP</div>' + //--
                            '<br><div style="text-align:center;"><a ' + astyle2 + '" href="!craft --charid ' + charid + ' --item ' + state.down.now.item + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">Craft Item</a></div>' + //--
                            '</div>'
                        );
                    } else if (type=="Misc") {
                        sendChat("Downtime","/w "+msg.who+" <div " + divstyle + ">" + //--
                            '<div ' + headstyle + '>Crafting</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<div style="text-align:center;">Available ' + type + " Items" + //--
                            '<table>' + //--
                            '<tr><td>Rarity: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ' + amount + '">' + rarity + '</a></td></tr>' + //--
                            '<tr><td>Item Type: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ?{Item Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ' + rarity + ' --amount ' + amount + '">' + type + '</a></td></tr>' + //--
                            '<tr><td>Amount: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ?{Amount?|1}">' + amount + '</a></td></tr>' + //--
                            '<tr><td>Item: </td><td><a ' + astyle1 + '" href="!setitem --item ?{Item?|' + list + '} --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">' + state.down.now.item + '</a></td></tr>' + //--
                            '</table>' + //--
                            '<div style="text-align:center;">Price: ' + price + ' GP</div>' + //--
                            '<br><div style="text-align:center;"><a ' + astyle2 + '" href="!craft --charid ' + charid + ' --item ' + state.down.now.item + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">Craft Item</a></div>' + //--
                            '</div>'
                        );
                    } else if (type=="Armor" || type=="Accessoires") {
                        sendChat("Downtime","/w "+msg.who+" <div " + divstyle + ">" + //--
                            '<div ' + headstyle + '>Crafting</div>' + //--
                            '<div ' + substyle + '>Menu</div>' + //--
                            '<div ' + arrowstyle + '></div>' + //--
                            '<div style="text-align:center;">Available ' + type + //--
                            '<table>' + //--
                            '<tr><td>Rarity: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ?{Rarity?|Common|Uncommon|Rare|Very Rare|Legendary} --amount ' + amount + '">' + rarity + '</a></td></tr>' + //--
                            '<tr><td>Item Type: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ?{Item Type?|Weapon|Armor|Accessoires|Scroll|Misc} --rarity ' + rarity + ' --amount ' + amount + '">' + type + '</a></td></tr>' + //--
                            '<tr><td>Amount: </td><td><a ' + astyle1 + '" href="!craftmenu --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ?{Amount?|1}">' + amount + '</a></td></tr>' + //--
                            '<tr><td>Item: </td><td><a ' + astyle1 + '" href="!setitem --item ?{Item?|' + list + '} --charid ' + charid + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">' + state.down.now.item + '</a></td></tr>' + //--
                            '</table>' + //--
                            '<div style="text-align:center;">Price: ' + price + ' GP</div>' + //--
                            '<br><div style="text-align:center;"><a ' + astyle2 + '" href="!craft --charid ' + charid + ' --item ' + state.down.now.item + ' --type ' + type + ' --rarity ' + rarity + ' --amount ' + amount + '">Craft Item</a></div>' + //--
                            '</div>'
                        );
                    }
                }
            }
        });
    },
    
    craft = function(charid,item,type,rarity,amount,msg) {
        charid=charid.replace("charid ","");
        type=type.replace("type ","");
        rarity=rarity.replace("rarity ","");
        amount=Number(amount.replace("amount ",""));
        item=item.replace("item ","");
        let itemList;
        let price;
        let neededtime;
        switch (rarity) {
            case 'Common':
                price=50;
                neededtime=5;
                if (type=="Weapon") {
                    itemList=state.List.common.weapon;
                } else if (type=="Armor") {
                    itemList=state.List.common.armor;
                } else if (type=="Accessoires") {
                    itemList=state.List.common.accessoires;
                } else if (type=="Scroll") {
                    itemList=state.List.common.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemList=state.List.common.misc;
                }
                break;
            case 'Uncommon':
                price=200;
                neededtime=10;
                if (type=="Weapon") {
                    itemList=state.List.uncommon.weapon;
                } else if (type=="Armor") {
                    itemList=state.List.uncommon.armor;
                } else if (type=="Accessoires") {
                    itemList=state.List.uncommon.accessoires;
                } else if (type=="Scroll") {
                    itemList=state.List.uncommon.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemList=state.List.uncommon.misc;
                }
                break;
            case 'Rare':
                price=2000;
                neededtime=50;
                if (type=="Weapon") {
                    itemList=state.List.rare.weapon;
                } else if (type=="Armor") {
                    itemList=state.List.rare.armor;
                } else if (type=="Accessoires") {
                    itemList=state.List.rare.accessoires;
                } else if (type=="Scroll") {
                    itemList=state.List.rare.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemList=state.List.rare.misc;
                }
                break;
            case 'Very Rare':
                price=20000;
                neededtime=125;
                if (type=="Weapon") {
                    itemList=state.List.very_rare.weapon;
                } else if (type=="Armor") {
                    itemList=state.List.very_rare.armor;
                } else if (type=="Accessoires") {
                    itemList=state.List.very_rare.accessoires;
                } else if (type=="Scroll") {
                    itemList=state.List.very_rare.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemList=state.List.very_rare.misc;
                }
                break;
            case 'Legendary':
                price=100000;
                neededtime=250;
                if (type=="Weapon") {
                    itemList=state.List.legendary.weapon;
                } else if (type=="Armor") {
                    itemList=state.List.legendary.armor;
                } else if (type=="Accessoires") {
                    itemList=state.List.legendary.accessoires;
                } else if (type=="Scroll") {
                    itemList=state.List.legendary.scroll;
                    price=Math.floor(price/2);
                    neededtime=Math.floor(price/2);
                } else if (type=="Misc") {
                    itemList=state.List.legendary.misc;
                }
                break;
        }
        let trueitem = itemList.find(e => e.name==item);
        if (trueitem) {
            price+=Number(trueitem.price);
            let char=findObjs({ 
                _type: 'character', 
                _id: charid
            }, {caseInsensitive: true})[0];
            if (char) {
                let gold=findObjs({
                    _type: 'attribute',
                    _characterid: charid,
                    _name: 'gp'
                }, {caseInsensitive: true})[0]
                let cur=gold.get('current');
                cur-=price;
                gold.set('current',cur);
                char.get("gmnotes", function(gmnotes) {
                    let time = Number(String(gmnotes.replace(" Day","")).replace("s",""));
                    time-=neededtime;
                    let notes = "";
                    if (time<=1) {
                        if (time==1) {
                            notes+=time+" Day";
                        }
                    } else if (time>1) {
                        notes+=time+" Days";
                    }
                    char.set("gmnotes",notes);
                });
                let description=trueitem.desc;
                let modifiers=trueitem.modifiers;
                let itemname=trueitem.name;
                let properties=trueitem.properties;
                let itemweight=trueitem.weight;
                amount=trueitem.amount*amount;
                let inventory=findObjs({
                    _type: 'attribute',
                    _characterid: charid
                });
                let row=-1;
                let itemid;
                let rownum;
                let count;
                _.each(inventory,function(object) {
                    let name = object.get('_name');
                    if (name.includes('repeating_inventory')) {
                        if (name.includes('_itemname')) {
                            row+=1;
                            if (object.get('current')==item) {
                                let test=name.replace("repeating_inventory_","");
                                test=test.replace("_itemname","");
                                itemid=test;
                                rownum=row;
                            }
                        }
                    }
                });
                _.each(inventory,function(object) {
                    let name=object.get('_name');
                    if (name.includes('_itemcount')) {
                        let test=name.replace("repeating_inventory_","");
                        test=test.replace("_itemcount","");
                        if (test==itemid) {
                            count=object.get('current');
                        }
                    }
                });
                if (itemid) {
                    if (count) {
                        amount=Number(amount)+Number(count);
                    }
                    sendChat("Downtime","!setattr --charid "+charid+" --repeating_inventory_"+itemid+"_itemcount|"+amount);
                } else {
                    sendChat("Downtime","!setattr --charid "+charid+" --repeating_inventory_-CREATE_itemname|"+itemname+" --repeating_inventory_-CREATE_itemcount|"+amount+" --repeating_inventory_-CREATE_itemcontent|"+description+" --repeating_inventory_-CREATE_itemmodifiers|"+modifiers+" --repeating_inventory_-CREATE_itemweight|"+itemweight+" --repeating_inventory_-CREATE_itemproperties|"+properties);
                }
            }
        }
        let char=findObjs({ 
            _type: 'character', 
            _id: charid
        }, {caseInsensitive: true})[0];
        let name = char.get("name");
        let handnum=getHandoutNum(msg.playerid,charid);
        let time=amount*neededtime;
        let desc="<br><br>"+name+" spends "+time+" Days and "+price+" GP crafting "+amount+"x "+item
        setHandoutDesc(msg.playerid,handnum,desc);
        sendChat("Downtime","/w "+msg.who+" You craft "+amount+"x "+item);
    },
    
    work = function(charid,type,amount,msg) {
        let skill=type.replace("skill ","");
        type=type.replace("skill ","");
        type=type.replace(" ","_");
        type=type.replace(" ","_");
        type=type.toLowerCase();
        type=type+"_bonus";
        amount=Number(amount.replace("time ",""));
        charid=charid.replace("charid ","");
        let char=findObjs({ 
            _type: 'character', 
            _id: charid
        }, {caseInsensitive: true})[0];
        if (char) {
            let attr=getAttrByName(charid,type)
            var gp=0;
            for (let i=0;i<Number(amount);i++) {
                gp+=randomInteger(20)+Number(attr);
            }
            char.get("gmnotes",function(gmnotes) {
                let time;
                time=Number(String(gmnotes.replace(" Day","")).replace("s",""));
                
                if (time<amount) {
                    sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!")
                } else {
                    time-=amount;
                    let nnotes="";
                    if (time>0) {
                        if (time==1) {
                            nnotes=String(time)+" Day";
                        } else {
                            nnotes=String(time)+" Days";
                        }
                    }
                    char.set("gmnotes",nnotes);
                }
            });
            var gold=findObjs({
                _type: 'attribute',
                _characterid: charid,
                _name: "gp"
            }, {caseInsensitive: true})[0];
            var cur=Number(gold.get('current'));
            sendChat("Downtime","/w "+msg.who+" You worked for "+amount+" Days and gained "+gp+" GP!");
            let mun=gp;
            gp+=cur;
            gold.set('current',gp);
            let handnum=getHandoutNum(msg.playerid,charid);
            let name = char.get("name");
            let desc="<br><br>"+name+" spends "+amount+" Days working, using "+skill+", earning "+mun+" GP.";
            setHandoutDesc(msg.playerid,handnum,desc);
        }
    },
    
    crimemenu = function(charid,type,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let speakingName = msg.who;
        let dc=state.down.now.dc;
        type=type.replace("type ","");
        charid=charid.replace("charid ","");
        var amount=7;
        let char = findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        let mod;
        let type1;
        if (type=='Thieves\' Tools') {
            mod=Number(getAttrByName(charid,"dexterity_mod"));
            mod+=Number(getAttrByName(charid,"pb"));
        } else {
            type1=type.toLowerCase();
            type1=type+"_bonus";
            mod=Number(getAttrByName(charid,type1));
        }
        if (state.down.now.crimeval>=1000) {
            state.down.now.dc=25;
        } else if (state.down.now.crimeval>=200) {
            state.down.now.dc=20;
        } else if (state.down.now.crimeval>=100) {
            state.down.now.dc=15;
        } else if (state.down.now.crimeval>0) {
            state.down.now.dc=10;
        }
        sendChat("Downtime","/w " + msg.who + " <div " + divstyle + ">" + //--
            '<div ' + headstyle + '>Crime</div>' + //--
            '<div ' + substyle + '>Menu</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            'DC: ' + state.down.now.dc + //--
            '<br>' + //--
            '<table>' + //--
            '<tr><td>Skill/Tool: </td><td><a ' + astyle1 + '" href="!crime --type ?{Type?|Stealth|Thieves\' Tools|Investigation|Perception|Deception}">' + type + '</a></td></tr>' + //--
            '<tr><td>Time used: </td><td>' + amount + ' Days</td></tr>' + //--
            '<tr><td>Targetted Value: </td><td><a ' + astyle1 + '" href="!setvalue --amount ?{Amount?|1} --' + type + '">' + state.down.now.crimeval + ' GP</a></td></tr>' + //-- 
            '</table>' + //--
            '<br>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!commit --type ' + type1 + ' --amount ' + amount + '">Commit Crime</a></div>' + //--
            '</div>'
        );
    },
    
    crime = function(charid,type,msg) {
        type=type.replace("type ","");
        charid=charid.replace("charid ","");
        let char = findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        var gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: "gp"
        }, {caseInsensitive: true})[0];
        let handnum=getHandoutNum(msg.playerid,charid);
        let name = char.get("name");
        var cur=Number(gold.get('current'));
        char.get("gmnotes",function(gmnotes){
            let ntime=Number(gmnotes.replace(" Days",""));
            if (ntime<7) {
                sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!");
            } else {
                let cur=gold.get('current');
                if (cur<25) {
                    sendChat("Downtime","/w " + msg.who + " You don\'t have enough GP to do that!");
                } else {
                    let notes="";
                    ntime-=7;
                    if (ntime>0) {
                        notes+=String(ntime)+" Days";
                    }
                    char.set("gmnotes",notes);
                    cur-=25;
                    gold.set('current',cur);
                    var bonus=Number(getAttrByName(charid,type));
                    var passnum=0;
                    for (let j=1;j<=3;j++) {
                        var check=randomInteger(20)+bonus;
                        if (check>Number(state.down.now.dc)) {
                            passnum+=1;
                            sendChat("Downtime","/w gm Check "+j+" passed!");
                        } else {
                            sendChat("Downtime","/w gm Check "+j+" failed!");
                        }
                    }
                    gold=findObjs({
                        _type: 'attribute',
                        _characterid: charid,
                        _name: "gp"
                    }, {caseInsensitive: true})[0];
                    if (passnum==0) {
                        var weeknum=Math.floor(state.down.now.crimeval/25);
                        sendChat("Downtime","/w "+msg.who+" The Heist fails and you are caught, forced to pay a fine of " + state.down.now.crimeval + " GP and are locked into Jail for "+weeknum+" Weeks");
                        let desc="<br><br>"+name+" spends 7 Days and 25 GP setting up a Heist, but they fail and are caught. They pay a fine of "+state.down.now.crimeval+" GP and are locked into Jail for "+weeknum+" Weeks.";
                        setHandoutDesc(msg.playerid,handnum,desc);
                        if ((cur-Number(state.down.now.crimeval))<0) {
                            cur=0;
                            gold.set('current',0);
                        } else {
                            cur-=Number(state.down.now.crimeval);
                            gold.set('current',cur);
                        }
                        let days=Number(weeknum*7);
                        char=findObjs({
                            _type: 'character',
                            name: msg.who
                        }, {caseInsensitive: true})[0];
                        char.get("gmnotes",function(gmnotes) {
                            let time;
                            time=gmnotes.replace(" Days","");
                            time=Number(time);
                            let notes="";
                            if (time<days) {
                                let newdays=Number(days-time);
                                notes="Must spend "+String(newdays)+" Days in Jail.";
                            } else {
                                time-=days;
                                if (time!==0) {
                                    notes=String(time)+" Days";
                                }
                            }
                            char.set("gmnotes",notes);
                        });
                    } else if (passnum==1) {
                        let crimeval=Number(state.down.now.crimeval)
                        sendChat("Downtime","/w "+msg.who+" You fail the Heist but manage to get away.");
                        let desc="<br><br>"+name+" spends 7 Days and 25 GP trying to pull off a Heist, targeting "+crimeval+" GP, but fail. They manage to get away before they could get caught.";
                        setHandoutDesc(msg.playerid,handnum,desc);
                    } else if (passnum==2) {
                        let crimeval=Number(state.down.now.crimeval)/2;
                        sendChat("Downtime","/w "+msg.who+" You manage to pull off the Heist but could only get away with "+crimeval+" GP.");
                        cur+=crimeval;
                        gold.set('current',cur);
                        let desc="<br><br>"+name+" spends 7 Days and 25 GP setting up a Heist. They pull it off but only manage to get away with "+crimeval+" GP.";
                        setHandoutDesc(msg.playerid,handnum,desc);
                    } else if (passnum==3) {
                        let crimeval=Number(state.down.now.crimeval);
                        sendChat("Downtime","/w "+msg.who+" You pull off the Heist successfully and gain "+crimeval+" GP.");
                        cur+=crimeval;
                        gold.set('current',cur);
                        let desc="<br><br>"+name+" spends 7 Days and 25 GP setting up a Heist. They pull it off and gain "+crimeval+" GP.";
                        setHandoutDesc(msg.playerid,handnum,desc);
                    }
                }
            }
        });
    },
    
    trainmenu = function(charid,type,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        charid=charid.replace("charid ","");
        let char = findObjs({
            _type: 'character',
            _id: charid
        })[0];
        type=type.replace("type ","");
        let list;
        switch (type) {
            case 'Tool':
                list="Alchemist\'s Supplies,Brewer\'s Supplies,Calligrapher\'s Supplies,Carpenter\'s Tools,Cartographer\'s Tools,Cobbler\'s Tools,Cook\'s Utensils,Glasblower\'s Tools,Jeweler\'s Tools,Leatherworker\'s Tools,Mason\'s Tools,Painter\'s Supplies,Potter\'s Tools,Smith\'s Tools,Tinker\'s Tools,Weaver\'s Tools,Woodcarver\'s Tools,Disguise Kit,Forgery Kit,Dice Set,Dragonchess set,Playing Card Set,Three-Dragon Ante Set,Herbalism Kit,Bagpipes,Drum,Dulcimer,Flute,Lute,Lyre,Horn,Pan Flute,Shawm,Viol,Navigator\'s Tools,Poisoner\'s Kit,Thieves\' Tools,Land Vehicles,Water Vehicles";
                break;
            case 'Language':
                list="Common,Dwarvish,Elvish,Giant,Gnomish,Goblin,Halfling,Orc,Abyssal,Celestial,Draconic,Deep Speech,Infernal,Primordial,Sylvan,Undercommon";
                break;
        }
        list=list.split(',');
        let attribute = findObjs({
            _type: 'attribute',
            _characterid: charid
        }, {caseInsensitive: true});
        let count=0;
        let attrlist=[];
        if (type=="Tool") {
            _.each(attribute,function(attr) {
                let attrname = attr.get('_name');
                if (attrname.includes('repeating_tool') && attrname.includes('_toolname')) {
                    for (let i=0;i<list.length;i++) {
                        if (list[i]==attr.get('current')) {
                            attrlist[count]=list[i];
                            count+=1;
                        }
                    }
                }
            });
            for (let i=0;i<list.length;i++) {
                for (let j=0;j<attrlist.length;j++) {
                    if (list[i]==attrlist[j]) {
                        list[i]="";
                    }
                }
            }
            let test=false;
            for (let i=0;i<list.length;i++) {
                if (list[i].includes(state.down.now.train)) {
                    test=true;
                }
            }
            if (test==false) {
                state.down.now.train="";
            }
            list=String(list);
            for (let i=0;i<37;i++) {
                list=list.replace(",,",",");
            }
            list=list.split(',');
        } else {
            _.each(attribute,function(attr) {
                let attrname = attr.get('_name');
                if (attrname.includes('repeating_traits') && attrname.includes('_name')) {
                    for (let i=0;i<list.length;i++) {
                        if (list[i]==attr.get('current')) {
                            attrlist[count]=list[i];
                            count+=1;
                        }
                    }
                }
            });
            for (let i=0;i<list.length;i++) {
                for (let j=0;j<attrlist.length;j++) {
                    if (list[i]==attrlist[j]) {
                        list[i]="";
                    }
                }
            }
            let test=false;
            for (let i=0;i<list.length;i++) {
                if (list[i].includes(state.down.now.train)) {
                    test=true;
                }
            }
            if (test==false) {
                state.down.now.train="";
            }
            list=String(list);
            for (let i=0;i<38;i++) {
                list=list.replace(",,",",");
            }
            list=list.split(',');
        }
        let mintime=50;
        list=String(list);
        for (let i=0;i<38;i++) {
            list=list.replace(',','|');
        }
        let player = findObjs({
            _type: 'player',
            _id: msg.playerid
        })[0];
        let playerName = player.get('_displayname');
        char.get('gmnotes',function(gmnotes) {
            let time=gmnotes.replace(" Days","");
            if (Number(time)<mintime) {
                sendChat("Downtime","/w " + playerName + " You do not have enough time left to train.");
            } else {
                if (type=="Tool") {
                    sendChat("Downtime","/w " + playerName + " <div " + divstyle + ">" + //--
                        '<div ' + headstyle + '>Training</div>' + //--
                        '<div ' + substyle + '>Menu</div>' + //--
                        '<div ' + arrowstyle + '></div>' + //--
                        '<div style="text-align:center;">Tools</div>' + //--
                        '<table>' + //--
                        '<tr><td>Available Downtime: </td><td>' + gmnotes + '</td></tr>' + //--
                        '<tr><td>Needed Downtime: </td><td>' + mintime + ' Days</td></tr>' + //--
                        '</table>' + //--
                        '<td><tr>Current Tool: </td><td><a ' + astyle1 + '" href="!settrain --charid '+charid+' --type Tool --?{Tool?|' + list + '}">' + state.down.now.train + '</a></td></tr>' + //--
                        '<br><br>' + //--
                        '<div style="text-align:center;"><a ' + astyle2 + '" href="!train --charid '+charid+' --' + type + ' --' + state.down.now.train + '">Train now</a></div>' + //--
                        '</div>'
                    );
                } else {
                    sendChat("Downtime","/w " + playerName + " <div " + divstyle + ">" + //--
                        '<div ' + headstyle + '>Training</div>' + //--
                        '<div ' + substyle + '>Menu</div>' + //--
                        '<div ' + arrowstyle + '></div>' + //--
                        '<div style="text-align:center;">Languages</div>' + //--
                        '<br>' + //--
                        '<table>' + //--
                        '<tr><td>Available Downtime: </td><td>' + gmnotes + '</td></tr>' + //--
                        '<tr><td>Needed Downtime: </td><td>' + mintime + ' Days</td></tr>' + //--
                        '<td><tr>Current Tool: </td><td><a ' + astyle1 + '" href="!settrain --charid '+charid+' --type Language --?{Language?|' + list + '}">' + state.down.now.train + '</a></td></tr>' + //--
                        '</table>' + //--
                        '<br>' + //--
                        '<div style="text-align:center;"><a ' + astyle2 + '" href="!train --charid '+charid+' --' + type + ' --' + state.down.now.train + '">Train now</a></div>' + //--
                        '</div>'
                    );
                }
            }
        });
    },
    
    train = function(charid,type,name,msg) {
        charid=charid.replace("charid ","");
        type=type.replace("type ","");
        let char = findObjs({
            _type: 'character',
            _id: charid
        }, {caseInsensitive: true})[0];
        log(charid)
        let handnum=getHandoutNum(msg.playerid,charid);
        let pname = char.get("name");
        let cost=25*5;
        let gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: 'gp'
        }, {caseInsensitive: true})[0];
        let cur=gold.get('current');
        if (cur<cost) {
            sendChat("Downtime","/w "+msg.who+" You do not have enough money to do that!");
        } else {
            cur-=cost;
            gold.set('current',cur);
            type=type.replace(" ","");
            if (type=="Tool") {
                let attributes = findObjs({
                    _type: 'attribute',
                    _characterid: charid
                });
                let count=0;
                _.each(attributes,function(attr) {
                    let attrname = attr.get('_name');
                    if (attrname.includes('repeating_tool') && attrname.includes('_toolname')) {
                        count+=1;
                    }
                });
                char.get('gmnotes',function(gmnotes) {
                    let num=Number(gmnotes.replace(' Days',''));
                    num-=50;
                    let notes=String(num)+" Days";
                    char.set('gmnotes',notes);
                });
                sendChat("Downtime",'!setattr --charid '+charid+' --repeating_tool_-CREATE_toolname|'+name);
                sendChat("Downtime",'!setattr --charid '+charid+' --repeating_tool_$'+count+'_toolattr|QUERY');
            } else {
                char.get('gmnotes',function(gmnotes) {
                    let num=Number(gmnotes.replace(' Days',''));
                    num-=50;
                    let notes=String(num)+" Days";
                    char.set('gmnotes',notes);
                });
                sendChat("Downtime",'!setattr --charid '+charid+' --repeating_proficiencies_-CREATE_name|'+name);
            }
        }
        let desc="<br><br>"+pname+" spends 50 Days and "+cost+" GP training with "+name+".";
        setHandoutDesc(msg.playerid,handnum,desc);
        sendChat("Downtime","/w "+msg.who+" You successfully gained proficiency with "+name);
    },
    
    researchmenu = function(charid,price,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let neededtime=5;
        charid=charid.replace('charid ','');
        let char = findObjs({
            _type: 'character',
            _id: charid
        })[0];
        price=price.replace("price ","");
        let amount=Number(price);
        let base=50;
        if (!amount) {
            amount=base;
        } else {
            if (amount<base) {
                amount=base;
            } else {
                amount+=base;
            }
        }
        let gold = findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: 'gp'
        }, {caseInsensitive: true})[0];
        char.get('gmnotes',function(gmnotes) {
            let time=Number(String(gmnotes.replace(" Day","")).replace("s",""));
            if (time<neededtime) {
                sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!")
            } else {
                let cur=gold.get('current');
                if (cur<amount) {
                    sendChat("Downtime","/w "+msg.who+" You do not have enough money to do that!");
                } else {
                    sendChat("Downtime","/w " + msg.who + " <div " + divstyle + ">" + //--
                        '<div ' + headstyle + '>Research</div>' + //--
                        '<div ' + substyle + '>Menu</div>' + //--
                        '<div ' + arrowstyle + '></div>' + //--
                        '<table>' + //--
                        '<tr><td>Needed Time: </td><td>' + neededtime + ' Days</td></tr>' + //--
                        '<tr><td>GP spent: </td><td><a ' + astyle1 + '" href="!researchmenu --charid ' + charid + ' --price ?{Amount?|50}">' + amount + ' GP</a></td></tr>' + //--
                        '</table>' + //--
                        '<div style="text-align:center;"><a ' + astyle2 + '" href="!research --charid ' + charid + ' --price ' + amount + '">Research</a></div>' + //--
                        '</div>'
                    );
                }
            }
        });
    },
    
    research = function(charid,gp,msg) {
        charid=charid.replace("charid ","");
        gp=Number(gp.replace("price ",""));
        let bonus=0;
        let base=50;
        if (gp<base*2) {
            bonus=1;
        } else if (gp<base*3) {
            bonus=2;
        } else if (gp<base*4) {
            bonus=3;
        } else if (gp<base*5) {
            bonus=4;
        } else if (gp<base*6) {
            bonus=5;
        } else if (gp>=base*6) {
            bonus=6;
        }
        let char = findObjs({
            _type: 'character',
            _id: charid
        })[0];
        let gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: 'gp'
        }, {caseInsensitive: true})[0];
        let cur=gold.get('current');
        cur-=gp;
        gold.set('current',cur);
        char.get("gmnotes",function(gmnotes){
            let time=Number(String(gmnotes.replace(' Day','')).replace('s',''));
            time-=5;
            let notes="";
            if (time>0) {
                if (time==1) {
                    notes=String(time)+" Day";
                } else {
                    notes=String(time)+" Days";
                }
            }
            char.set("gmnotes",notes);
        });
        let rand=randomInteger(20)+bonus;
        let desc;
        if (rand<=5) {
            desc="<br><br>"+char.get('name')+" spends 7 days and "+gp+" GP researching in the library but doesn\'t learn anything important.";
            sendChat("Downtime","/w "+msg.who+" You do not discover any important Information");
        } else if (rand<=10) {
            desc="<br><br>"+char.get('name')+" spends 7 days and "+gp+" GP researching in the library and learns one piece of lore.";
            sendChat("Downtime","/w gm "+char.get('name')+"learns one piece of lore.");
            sendChat("Downtime","/w "+msg.who+" You learn one piece of lore.");
        } else if (rand<=20) {
            desc="<br><br>"+char.get('name')+" spends 7 days and "+gp+" GP researching in the library and learns two pieces of lore.";
            sendChat("Downtime","/w gm "+char.get('name')+"learns two pieces of lore.");
            sendChat("Downtime","/w "+msg.who+" You learn two pieces of lore.");
        } else if (rand>20) {
            desc="<br><br>"+char.get('name')+" spends 7 days and "+gp+" GP researching in the library and learns three pieces of lore.";
            sendChat("Downtime","/w gm "+char.get('name')+"learns three pieces of lore.");
            sendChat("Downtime","/w "+msg.who+" You learn three pieces of lore.");
        }
        let handnum=getHandoutNum(msg.playerid,charid);
        setHandoutDesc(msg.playerid,handnum,desc);
    },
    
    gamblemenu = function(charid,amount,msg) {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        let neededtime=5;
        let minprice=state.down.now.minprice;
        let maxprice=state.down.now.maxprice;
        charid=charid.replace('charid ','');
        amount=Number(amount.replace("amount ",""));
        if (amount<minprice) {
            sendChat("Downtime","/w " + msg.who + " You must bet at least "+minprice+" GP!");
            amount=minprice;
        } else if (amount>maxprice) {
            sendChat("Downtime","/w " + msg.who + " The maximum amount you can bet is "+maxprice+" GP!");
            amount=maxprice;
        }
        let char=findObjs({
            _type: 'character',
            _id: charid
        })[0];
        let gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: 'gp'
        }, {caseInsensitive: true})[0];
        char.get("gmnotes",function(gmnotes) {
            let time=Number(String(gmnotes.replace(" Day","")).replace("s",""));
            if (time<5) {
                sendChat("Downtime","/w "+msg.who+" You do not have enough time to do that!");
            } else {
                let cur=gold.get('current');
                if (cur<amount) {
                    sendChat("Downtime","/w "+msg.who+" You do not have enough money!");
                } else {
                    sendChat("Downtime","/w " + msg.who + " <div " + divstyle + ">" + //--
                        '<div ' + headstyle + '>Gamble</div>' + //--
                        '<div ' + substyle + '>Menu</div>' + //--
                        '<div ' + arrowstyle + '></div>' + //--
                        '<table>' + //--
                        '<tr><td>Needed Time: </td><td>5 Days</td></tr>' + //--
                        '<tr><td>Minimum Bet: </td><td>' + minprice + ' GP</td></tr>' + //--
                        '<tr><td>Maximum Bet: </td><td>' + maxprice + ' GP</td></tr>' + //--
                        '<tr><td>Current Bet: </td><td><a ' + astyle1 + '" href="!gamblemenu --charid ' + charid + ' --amount ?{Amount?|10}">' + amount + '</a></td></tr>' + //--
                        '</table>' + //--
                        '<br>' + //--
                        '<div style="text-align:center;"><a ' + astyle2 + '" href="!gamble --charid ' + charid + ' --amount ' + amount + '">Start Gambling</a></div>' + //--
                        '</div>'
                    );
                }
            }
        });
    },
    
    gamble = function(charid,amount,msg) {
        charid=charid.replace("charid ","");
        amount=Number(amount.replace("amount ",""));
        let char=findObjs({
            _type: 'character',
            _id: charid
        })[0];
        let gold=findObjs({
            _type: 'attribute',
            _characterid: charid,
            _name: 'gp'
        }, {caseInsensitive: true})[0];
        let cur=gold.get('current');
        char.get("gmnotes",function(gmnotes) {
            let time=Number(String(gmnotes.replace(" Day","")).replace("s",""));
            time-=5;
            let notes;
            if (time>0) {
                if (time==1) {
                    notes=String(time)+" Day";
                } else {
                    notes=String(time)+" Days";
                }
            }
            char.set("gmnotes",notes);
        });
        let dc1=5+randomInteger(10)+randomInteger(10);
        let dc2=5+randomInteger(10)+randomInteger(10);
        let dc3=5+randomInteger(10)+randomInteger(10);
        let check1=randomInteger(20)+getAttrByName(charid,"insight_bonus");
        let check2=randomInteger(20)+getAttrByName(charid,"deception_bonus");
        let check3=randomInteger(20)+getAttrByName(charid,"intimidation_bonus");
        let pass=0;
        if (check1>=dc1) {
            pass+=1;
        }
        if (check2>=dc2) {
            pass+=1;
        }
        if (check3>=dc3) {
            pass+=1;
        }
        let desc;
        if (pass==0) {
            desc="<br><br>"+char.get('name')+" spends 5 days gambling and places a bet of "+amount+" GP. They lose all the money they bet and accrue a debt of "+amount+" GP!";
            cur-=(amount*2);
            gold.set('current',cur);
            sendChat("Downtime","/w "+msg.who+" You place a bet of "+amount+" GP but lose it all and accrue a debt of "+amount+" GP.");
        } else if (pass==1) {
            desc="<br><br>"+char.get('name')+" spends 5 days gambling and places a bet of "+amount+" GP. They lose half the amount they bet.";
            cur-=(amount/2);
            gold.set('current',cur);
            sendChat("Downtime","/w "+msg.who+" You place a bet of "+amount+" GP but lose half of it.");
        } else if (pass==2) {
            desc="<br><br>"+char.get('name')+" spends 5 days gambling and places a bet of "+amount+" GP. They win 1.5 times the bet amount.";
            cur+=(amount/2);
            gold.set('current',cur);
            sendChat("Downtime","/w "+msg.who+" You place a bet of "+amount+" GP and win 1.5 times the bet amount.");
        } else if (pass==3) {
            desc="<br><br>"+char.get('name')+" spends 5 days gambling and places a bet of "+amount+" GP. They win twice the amount they bet.";
            cur+=(amount);
            gold.set('current',cur);
            sendChat("Downtime","/w "+msg.who+" You place a bet of "+amount+" GP and win twice the bet.");
        }
        let handnum=getHandoutNum(msg.playerid,charid);
        setHandoutDesc(msg.playerid,handnum,desc);
    },
    
    checkInstall = function() {
        if (!state.down) {
            setDefaults();
        }
        if (state.List) {
            setItemList();
        }
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };
    
    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };
}());
on('ready', function(){
    Downtime.CheckInstall();
    Downtime.RegisterEventHandlers();
});
