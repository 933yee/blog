const initFolderState = {
    folderIsOpen: {}
}
export function folderStates(state = initFolderState, action) {
    switch (action.type) {
        case '@UPDATE/FOLDER_STATES':
            return {
                ...state,
                folderIsOpen: action.nextStates
            };
        default:
            return state;
    }
}
