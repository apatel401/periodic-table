export const groupOptions = {
    mainLabel: 'Group', options: [
        { value: '1,3,11,19,37,55,87', label: '1/1A' },
        { value: '4,12,20,38,56,88', label: '2/2A' },
        { value: '21,39,57,89,58,59,59,60,61,62,63,64,65,66,67,68,69,70,71,90,91,92,93,94,95,96,97,98,99,100,101,102,103', label: '3/3B' },
        { value: '22,40,72,104', label: '4/4B' },
        { value: '23,41,73,105', label: '5/5B' },
        { value: '24,42,74,106', label: '6/6B' },
        { value: '25,43,75,107', label: '7/7B' },
        { value: '26,44,76,108', label: '8/8B' },
        { value: '27,45,77,109', label: '9/8B' },
        { value: '28,46,78,110', label: '10/8B' },
        { value: '29,47,79,111', label: '11/1B' },
        { value: '30,48,80,112', label: '12/2B' },
        { value: '5,13,31,49,81,113', label: '13/3A' },
        { value: '6,14,32,50,82,114', label: '14/4A' },
        { value: '7,15,33,51,83,115', label: '15/5A' },
        { value: '8,16,34,52,84,116', label: '16/6A' },
        { value: '9,17,35,53,85,117', label: '17/7A' },
        { value: '2,10,18,36,54,86,118', label: '18/8A' }
    ]
}

export const periodOptions = {
    mainLabel: 'Period', options: [
        { value: '1-2', label: '1' },
        { value: '3-10', label: '2' },
        { value: '11-18', label: '3' },
        { value: '19-36', label: '4' },
        { value: '37-54', label: '5' },
        { value: '55-86', label: '6' },
        { value: '87-118', label: '7' }
    ]
}

export const classificationOptions = {
    mainLabel: "Classification", options:[
        { value: 'element', label: 'All' },
        { value: 'metal,actinide,lanthanide', label: 'Metals' },
        { value: 'nonmetal,noble', label: 'Non-metals' },
        { value: 'metalloid,element-84,element-85,element-118', label: 'Metalloids' },
        { value: 'lanthanide', label: 'Lanthanoids' },
        { value: 'actinide', label: 'Actinoids' },
        { value: 'transition,lanthanide,actinide,element-109,element-110,element-111,element-112', label: 'Transition Metals' },
        { value: 'alkali', label: 'Alkali Metals' },
        { value: 'alkaline', label: 'Alkali-earth Metals' },
        { value: 'halogens', label: 'Halogens' },
        { value: 'noble', label: 'Noble Gases' }
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