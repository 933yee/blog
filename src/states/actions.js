export function updateFolderStates(nextStates) {
    return {
        type: '@UPDATE/FOLDER_STATES',
        nextStates
    };
}

export function expandFolderStates() {
    return {
        type: '@EXPAND/FOLDER_STATES',
    };
}

export function collapseFolderStates() {
    return {
        type: '@COLLAPSE/FOLDER_STATES',
    };
}

