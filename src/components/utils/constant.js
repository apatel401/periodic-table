export const groupOptions = {
    mainLabel: 'Group', options: [
        { value: '1,3,11,19,37,55,87', label: '1/1A', description: "Group 1 includes hydrogen and the alkali metals. The alkali metals are soft, highly reactive metals, and their reactivity increases down the group. Hydrogen behaves very differently from elements in the lower periods and so scientists disagree over whether it should belong to group 1 or 17."},
        { value: '4,12,20,38,56,88', label: '2/2A' , description: "The group 2 elements are also called the ‘alkali-earth metals’. They are all reactive metals with distinctive flame colours. In general they are harder, denser and have higher melting points than each alkali metal in the same period."},
        { value: '21,39,57,89,58,59,59,60,61,62,63,64,65,66,67,68,69,70,71,90,91,92,93,94,95,96,97,98,99,100,101,102,103', label: '3/3B' , description: "Group 3 is a family of transition metal elements. They are most often found in the +3 oxidation state. Scientists do not always agree whether lanthanum and actinium, or lutetium and lawrencium, should be included in this group."},
        { value: '22,40,72,104', label: '4/4B', description: "Group 4 is a group of transition metal elements with high melting points." },
        { value: '23,41,73,105', label: '5/5B' , description: "Group 5 is a group of reactive transition metal elements with high melting points."},
        { value: '24,42,74,106', label: '6/6B' , description: "Group 6 is a group of transition metal elements."},
        { value: '25,43,75,107', label: '7/7B' , description: "Group 7 is a group of transition metal elements containing manganese, technetium, rhenium and bohrium"},
        { value: '26,44,76,108', label: '8/8B' , description: "Group 8 is a group of shiny, silvery transition metals containing iron, ruthenium, osmium and hassium."},
        { value: '27,45,77,109', label: '9/8B' , description: "Group 9 is a group of silvery-white transition metal elements with high melting points. The group contains cobalt, rhodium, iridium and meitnerium."},
        { value: '28,46,78,110', label: '10/8B' , description: "Group 10 is a group of white to light grey transition metal elements. The group contains nickel, palladium, platinum and darmstadtium."},
        { value: '29,47,79,111', label: '11/1B', description: "Group 11 is a group of transition metals. The group includes copper, silver and gold, which are sometimes called the 'coinage metals'." },
        { value: '30,48,80,112', label: '12/2B' , description: "Group 12 is a group of metals. They each have a full d sub-shell. The elements in this group tend to have low melting points and mercury is the only metal that is a liquid at room temperature."},
        { value: '5,13,31,49,81,113', label: '13/3A' , description: "Group 13 is the boron group. All the elements in this group are metals except for boron, which is a metalloid."},
        { value: '6,14,32,50,82,114', label: '14/4A' , description: "Group 14 is the carbon group. It contains a combination of non-metals, metalloids and metals."},
        { value: '7,15,33,51,83,115', label: '15/5A' , description: "Group 15 is called the pnictogens or nitrogen group. It contains a combination of non-metals, metalloids and metals."},
        { value: '8,16,34,52,84,116', label: '16/6A' , description: "Group 16 is called the chalcogens, or oxygen family. It contains a combination of non-metals, metalloids and metals."},
        { value: '9,17,35,53,85,117', label: '17/7A' , description: "Group 17 is called the halogens. This is a group of highly reactive non-metals. This is the only group that contains elements in all three states of matter at room temperature and pressure. Fluorine and chlorine are gases, bromine is a liquid and iodine is a solid."},
        { value: '2,10,18,36,54,86,118', label: '18/8A' , description: "The group 18 elements are commonly known as the noble gases. They are typically unreactive. At one time they were known as the inert gases, but some compounds (particularly of Xe) are now known. Reactivity increases down the group with radon being the most reactive."}
    ]
}

export const periodOptions = {
    mainLabel: 'Period', options: [
        { value: '1-2', label: '1' , description: "The first period contains two elements: hydrogen and helium. These are both colourless gases. Helium is usually placed in group 18 with the noble gases. Hydrogen behaves very differently from elements in the lower periods and so scientists disagree over whether it should belong to group 1 or 17."},
        { value: '3-10', label: '2' , description: "The second period contains eight elements. Elements in this period typically follow the so-called ‘octet rule’. This means that these elements tend to form compounds in which each atom has eight electrons in its outer electron shell."},
        { value: '11-18', label: '3' , description: "The third period contains eight elements. Elements in this period typically follow the so-called 'octet rule'. This means that these elements tend to form compounds in which each atom has eight electrons in its outer electron shell."},
        { value: '19-36', label: '4', description: "The fourth period contains 18 elements. The 'octet rule', which applied to the second and third periods, does not apply here because of the introduction of the d sub-shell." },
        { value: '37-54', label: '5', description: "The fifth period contains 18 elements." },
        { value: '55-86', label: '6' , description: "The sixth period contains 32 elements, and includes the lanthanoids. This period contains lead, which is the heaviest stable element in the periodic table."},
        { value: '87-118', label: '7', description: "The seventh period contains 32 elements, and includes the actinoids. This period ends with oganesson which is the heaviest element for which discovery has been claimed." }
    ]
}

export const classificationOptions = {
    mainLabel: "Classification", options:[
        { value: 'element', label: 'All' , description: "Selecting “ALL” you can see all the elements as follow: Blue: Metals Green: Non-Metals Pink: Metalloids Red: Unknown (IUPAC confirmed the discovery, but this entry will be updated when more information is available)"},
        { value: 'metal,actinide,lanthanide', label: 'Metals' , description: "With the exception of hydrogen, the elements on the left-hand side of the periodic table are metals. Metals are generally shiny, malleable elements that conduct heat and electricity well. Most are solid at room temperature. In reactions metals tend to form positive ions."},
        { value: 'nonmetal,noble', label: 'Non-metals' , description: "The elements on the right-hand side of the periodic table are the non-metals. However, hydrogen is also a non-metal and it is located on the left-hand side. Non-metallic elements have more varied properties than metals. They are poor conductors of heat and electricity and in reactions they commonly form negative ions."},
        { value: 'metalloid,element-84,element-85,element-118', label: 'Metalloids' , description: "There is a zig-zag line toward the right side of the periodic table that acts as a sort of border between metals and nonmetals. Elements on either side of this line exhibit some properties of metals and some of the non-metals. Scientists do not always agree whether polonium and astatine, should be included in this group."},
        { value: 'lanthanide', label: 'Lanthanoids' , description: "The lanthanoids are often called the rare-earth elements. They actually sit in the sixth period between barium and hafnium. They are usually shown as a separate row below the rest of the periodic table to make it easier to display the whole table. The lanthanoids most commonly form cations with a +3 charge."},
        { value: 'actinide', label: 'Actinoids', description: "The actinoids actually sit in the seventh period between radium and rutherfordium. They are usually shown as a separate row below the rest of the periodic table to make it easier to display the whole table. The actinoids include plutonium, which is the heaviest naturally occurring element." },
        { value: 'transition,lanthanide,actinide,element-109,element-110,element-111,element-112', label: 'Transition Metals' , description: "Transition metals are typically hard and dense, and good conductors of heat and electricity."},
        { value: 'alkali', label: 'Alkali Metals' , description: "The alkali metals are very reactive metals that do not occur freely in nature. They have the silver-like lustre, high ductility, and excellent conductivity of electricity and heat. Alkali metals react vigorously, and often violently (can explode), with water to release hydrogen and form strong caustic solutions."},
        { value: 'alkaline', label: 'Alkali-earth Metals' , description: "The alkali-earth metals, in Group 2 (2A), are harder and have higher melting points than the adjacent alkali metals. This is the second most reactive family of elements in the periodic table."},
        { value: 'halogens', label: 'Halogens' , description: "Halogen means “salt-former” and compounds containing halogens are called “salts”. They exist in all three states of matter. Because of their great reactivity, the free halogen elements are not found in nature. In combined form, fluorine is the most abundant of the halogens in Earth’s crust."},
        { value: 'noble', label: 'Noble Gases' , description: "This group is composed of stable gases otherwise known as the non-reactive or inert elements. The noble gases are colourless, odourless, tasteless, nonflammable gases."}
    ]
}
export const generateNumberArray = (rangeStr) => {
    const [start, end] = rangeStr.split('-').map(Number);
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i.toString());
    }
    return numbers;
  };