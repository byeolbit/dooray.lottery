const MSG = {
    HELP: '`/lottery` Help:\n`/lottery Title`\n`/lottery "Title with space"`',
    CONFIRM: 'Click \'Submit\' button to start the lottery.',
    CONFIRM_CANCEL: 'Your lottery has been cancelled.',
    CREATE: '${param} created the lottery!',
    CLOSE: '${param} closed the lottery!',
    CLOSE_LOTTERY: '${param} canceled the lottery.',
    CANT_CLOSE: 'Only ${param} can close the lottery.',
    ITEM: 'Item',
    START: 'Start',
    CANCEL: 'Cancel',
    CLOSE_BTN: 'Close the lottery (Show result)',
    TOTAL: 'Total lottery',
    RESULT: 'Result',
    RESULT_DOWN_BELOW: 'You can see results down below.'
};

/**
 * 
 * @param {string} type
 * @param {*} param 
 *  
 * - Avaliable type lists -
 * HELP
 * CONFIRM
 * CONFIRM_CANCEL
 * CREATE
 * CLOSE
 * CLOSE_LOTTERY
 * CANT_CLOSE
 * SUBMIT
 * CANCEL
 * CLOSE_BTN
 * TOTAL
 * RESULT
 * RESULT_DOWN_BELOW
 */
const get = (type, param) => {
    return MSG[type].replace('${param}', param);
};

/**
 * (GroupWithoutSpace) "(Group with space)"
 */
const REGEXP = /([^\s\"]+)|\"([^"]*)\"/g;

module.exports = {
   get: get,
   REGEXP: REGEXP
};
