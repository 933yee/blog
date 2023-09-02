const initFolderState = {
    folderIsOpen: {}
}

export function folderStates(state = initFolderState, action) {
    function updateAllFolderStates(obj, updateValue) {
        // console.log(updateValue)
        // console.log(obj)
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    updateAllFolderStates(obj[key]);
                } else {
                    obj[key] = updateValue;
                }
            }
        }
    }
    switch (action.type) {
        case '@UPDATE/FOLDER_STATES':
            return {
                ...state,
                folderIsOpen: action.nextStates
            };
        case '@EXPAND/FOLDER_STATES':
            const expandStates = state.folderIsOpen;
            updateAllFolderStates(expandStates, true);
            return {
                ...state,
                folderIsOpen: expandStates
            };
        case '@COLLAPSE/FOLDER_STATES':
            const collapseStates = state.folderIsOpen;
            updateAllFolderStates(collapseStates, false);
            return {
                ...state,
                folderIsOpen: collapseStates
            };
        default:
            return state;
    }
}
