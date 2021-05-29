/* for any variable constants (see what I did there?!), see the DefinePlugins plugin
 * in the 'webpack.common.js' or 'webpack.<env>.js' files; these values are identified
 * by the double underscore (__****__) naming style, and the values are provided by webpack
 * during a webpack build and therefore may not be recognized as valid values by the compiler here
 */

export const
    GAME_TIME_IN_TICKS = 520, //weekly ticks for full decade
    UPDATE_INTERVAL_IN_MILLISECONDS = 3500, // 520 ticks for 30 min => 30 min per 520ticks => 3.5 seconds per tick
    RESET_INTERVAL_IN_MILLISECONDS = 5000; // pause for 5 seconds, then restart game
    // AppName = 'SampleAngularApp',
    // AppVersion = 'v0.0.0',
    // DATE_FORMAT_ddmmyyyy = 'dd-mmm-yyyy',
    // DATE_FORMAT_dMMMy = 'dd-MMM-y',
    // DATE_TIME_FORMAT = 'dd-MMM-y HH:mm Z',
    // DATE_TIME_LOCAL_FORMAT = 'dd-MMM-y h:mm a',
    // DEBOUNCE_INTERVAL = 400,
    // DEBOUNCE_INTERVAL_LONG = 700,
    // MAXIMUM_FILE_UPLOAD_SIZE_IN_MEGABYTES = 10,
    // ApiBaseUrl = '/api',
    // AppBaseUrl = '/',
    // RESPONSE_MESSAGE_TYPE = {
    //     SUCCESS: 'SUCCESS',
    //     ERROR: 'ERROR',
    //     WARNING: 'WARNING',
    //     INFO: 'INFO',
    //     REQUIRED: 'REQUIRED',
    //     INVALID: 'INVALID'
    // };
