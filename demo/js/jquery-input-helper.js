/**
 * @fileoverview jquery-input-helper.js
 * @author thujikun
 * @version 1.0.0
 */

/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 */

;(function($) {
    'use strict';

    function defineProp(obj, prop, val) {
        if ('defineProperty' in Object) {
            try {
                Object.defineProperty(obj, prop, {
                    enumerable: false,
                    writable: false,
                    configurable: false,
                    value: val
                });
            } catch (defPropException) {
                obj[prop] = val;
            }
        } else {
            obj[prop] = val;
        }
    }

    /**
     * @class InputHelper
     * @classdesc form input helper plugin
     * @param {Object} config configration of input helper
     * @param {String} option option parameter
     */
    var InputHelper = function(config, option) {
        this._constructor(config, option);
    };

    (function() {
        defineProp(InputHelper.prototype, '_defaults', {
            helper: {
                'cancelspace': {
                    listener: '_cancelSpace',
                    eventtype: 'keydown'
                },
                'autonext': {
                    listener: '_moveNext',
                    eventtype: 'input'
                },
                'autoprev': {
                    listener: '_movePrev',
                    eventtype: 'keydown'
                },
                'full2half': {
                    listener: '_full2half',
                    eventtype: 'blur'
                },
                'fullKana2halfKana': {
                    listener: '_fullKana2halfKana',
                    eventtype: 'blur'
                },
                'half2full': {
                    listener: '_half2full',
                    eventtype: 'blur'
                },
                'halfKana2fullKana': {
                    listener: '_halfKana2fullKana',
                    eventtype: 'blur'
                },
                'restriction': {
                    listener: '_restrict',
                    eventtype: 'input'
                },
                'insert': {
                    listener: '_insert',
                    eventtype: 'input'
                },
                'credit': {
                    listener: '_addCreditCompany',
                    eventtype: 'input'
                },
                'remove': {
                    listener: '_remove',
                    eventtype: 'input'
                },
            },
            restriction: {
                'number': /[^0-9]/,
                'half-char': /[^0-9a-zA-Z]/,
                'half': /[^\x20-\x7e]/,
                'half-kana': /[^ｦ-ﾝ]/,
                'tel': /[^0-9\-]/,
                'full-kana': /[^ァ-ヶ]/,
                'date': /[^0-9\/]/,
                'zip': /[^0-9\-]/,
                'credit': /[^0-9\-]/
            },
            charTable: {
                'a': 'ａ',
                'b': 'ｂ',
                'c': 'ｃ',
                'd': 'ｄ',
                'e': 'ｅ',
                'f': 'ｆ',
                'g': 'ｇ',
                'h': 'ｈ',
                'i': 'ｉ',
                'j': 'ｊ',
                'k': 'ｋ',
                'l': 'ｌ',
                'm': 'ｍ',
                'n': 'ｎ',
                'o': 'ｏ',
                'p': 'ｐ',
                'q': 'ｑ',
                'r': 'ｒ',
                's': 'ｓ',
                't': 'ｔ',
                'u': 'ｕ',
                'v': 'ｖ',
                'w': 'ｗ',
                'x': 'ｘ',
                'y': 'ｙ',
                'z': 'ｚ',
                'A': 'Ａ',
                'B': 'Ｂ',
                'C': 'Ｃ',
                'D': 'Ｄ',
                'E': 'Ｅ',
                'F': 'Ｆ',
                'G': 'Ｇ',
                'H': 'Ｈ',
                'I': 'Ｉ',
                'J': 'Ｊ',
                'K': 'Ｋ',
                'L': 'Ｌ',
                'M': 'Ｍ',
                'N': 'Ｎ',
                'O': 'Ｏ',
                'P': 'Ｐ',
                'Q': 'Ｑ',
                'R': 'Ｒ',
                'S': 'Ｓ',
                'T': 'Ｔ',
                'U': 'Ｕ',
                'V': 'Ｖ',
                'W': 'Ｗ',
                'X': 'Ｘ',
                'Y': 'Ｙ',
                'Z': 'Ｚ',
                '0': '０',
                '1': '１',
                '2': '２',
                '3': '３',
                '4': '４',
                '5': '５',
                '6': '６',
                '7': '７',
                '8': '８',
                '9': '９'
            },
            kanaTable: {
                'ｦ': 'ヲ',
                'ｧ': 'ァ',
                'ｨ': 'ィ',
                'ｩ': 'ゥ',
                'ｪ': 'ェ',
                'ｫ': 'ォ',
                'ｬ': 'ャ',
                'ｭ': 'ュ',
                'ｮ': 'ョ',
                'ｯ': 'ッ',
                'ｰ': 'ー',
                'ｱ': 'ア',
                'ｲ': 'イ',
                'ｳ': 'ウ',
                'ｴ': 'エ',
                'ｵ': 'オ',
                'ｶ': 'カ',
                'ｷ': 'キ',
                'ｸ': 'ク',
                'ｹ': 'ケ',
                'ｺ': 'コ',
                'ｻﾞ': 'ザ',
                'ｼﾞ': 'ジ',
                'ｽﾞ': 'ズ',
                'ｾﾞ': 'ゼ',
                'ｿﾞ': 'ゾ',
                'ｻ': 'サ',
                'ｼ': 'シ',
                'ｽ': 'ス',
                'ｾ': 'セ',
                'ｿ': 'ソ',
                'ﾀﾞ': 'ダ',
                'ﾁﾞ': 'ヂ',
                'ﾂﾞ': 'ヅ',
                'ﾃﾞ': 'デ',
                'ﾄﾞ': 'ド',
                'ﾀ': 'タ',
                'ﾁ': 'チ',
                'ﾂ': 'ツ',
                'ﾃ': 'テ',
                'ﾄ': 'ト',
                'ﾅ': 'ナ',
                'ﾆ': 'ニ',
                'ﾇ': 'ヌ',
                'ﾈ': 'ネ',
                'ﾉ': 'ノ',
                'ﾊﾟ': 'パ',
                'ﾋﾟ': 'ピ',
                'ﾌﾟ': 'プ',
                'ﾍﾟ': 'ペ',
                'ﾎﾟ': 'ポ',
                'ﾊﾞ': 'バ',
                'ﾋﾞ': 'ビ',
                'ﾌﾞ': 'ブ',
                'ﾍﾞ': 'ベ',
                'ﾎﾞ': 'ボ',
                'ﾊ': 'ハ',
                'ﾋ': 'ヒ',
                'ﾌ': 'フ',
                'ﾍ': 'ヘ',
                'ﾎ': 'ホ',
                'ﾏ': 'マ',
                'ﾐ': 'ミ',
                'ﾑ': 'ム',
                'ﾒ': 'メ',
                'ﾓ': 'モ',
                'ﾔ': 'ヤ',
                'ﾕ': 'ユ',
                'ﾖ': 'ヨ',
                'ﾗ': 'ラ',
                'ﾘ': 'リ',
                'ﾙ': 'ル',
                'ﾚ': 'レ',
                'ﾛ': 'ロ',
                'ﾜ': 'ワ',
                'ﾝ': 'ン'
            }
        });

        /**
         * @method _constructor
         * @desc initilize input helper
         * @param {Object} config configuration for input helper
         * @param {Object} option option for input field
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_constructor', function(config, option) {
            this.config = $.extend(true, {}, this._defaults, config);
            this.option = option;
            this._set();
        });

        /**
         * @method _constructor
         * @desc initilize input helper
         * @param {Object} config configuration for input helper
         * @param {Object} option option for input field
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_set', function() {
            var that = this,
                option = that.option,
                helper = that.config.helper,
                $input = that.config.$input,
                helperFuncs = {};

            $.each(option, function(key, condition) {
                var helperSetting = helper[key];
                helperFuncs[helperSetting.eventtype] = helperFuncs[helperSetting.eventtype] || [];

                helperFuncs[helperSetting.eventtype].push(function(e) {
                    that[helperSetting.listener](e, condition);
                });
            });

            $.each(helperFuncs, function(eventtype, funcs) {
                $input.on(eventtype, function(e) {
                    funcs.forEach(function(fn) {
                        fn.call(that, e);
                    });
                });
            });
        });

        /**
         * @method _cancelSpace
         * @desc ignore input space
         * @param {Object}  e         event Object
         * @param {Boolean} condition cancel or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_cancelSpace', function(e, condition) {
            var keyCode = e.keyCode;

            if (condition && keyCode === 32) {
                e.preventDefault();
            }
        });

        /**
         * @method _moveNext
         * @desc change focus on next input element
         * @param {Object} e     event Object
         * @param {Number} digit condition digit for moving
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_moveNext', function(e, digit) {
            setTimeout(function() {
                var value = e.target.value,
                    $el = $(e.target);

                if (!digit || digit < 0) {
                    return;
                }

                if (digit <= value.length) {
                    $el.blur().next().focus();
                }
            });
        });

        /**
         * @method _movePrev
         * @desc change focus on prev input element
         * @param {Object}  e         event Object
         * @param {Boolean} condition move or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_movePrev', function(e, condition) {
            setTimeout(function() {
                var keyCode = e.keyCode,
                    value = e.target.value,
                    $el = $(e.target);

                if (condition && !value && keyCode === 8) {
                    $el.blur().prev().focus();
                }
            });
        });

        /**
         * @method _full2half
         * @desc convert full-width character to half-width character
         * @param {Object}  e         event Object
         * @param {Boolean} condition convert or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_full2half', function(e, condition) {
            var value = e.target.value || '',
                replaceText = '',
                charTable = this.config.charTable;

            if (condition) {
                value.split('').forEach(function(string) {
                    $.each(charTable, function(half, all) {
                        string = string.replace(all, half);
                    });
                    replaceText += string;
                });
            }

            if (value !== replaceText) {
                e.target.value = replaceText;
            }
        });

        /**
         * @method _fullKana2halfKana
         * @desc convert full-width kana to half-width kana
         * @param {Object}  e         event Object
         * @param {Boolean} condition convert or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_fullKana2halfKana', function(e, condition) {
            var value = e.target.value || '',
                replaceText = '',
                kanaTable = this.config.kanaTable;

            if (condition) {
                value.split('').forEach(function(kana) {
                    $.each(kanaTable, function(half, all) {
                        kana = kana.replace(all, half);
                    });
                    replaceText += kana;
                });
            }

            e.target.value = replaceText;
        });

        /**
         * @method _half2full
         * @desc convert half-width character to full-width character
         * @param {Object}  e         event Object
         * @param {Boolean} condition convert or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_half2full', function(e, condition) {
            var value = e.target.value || '',
                replaceText = '',
                charTable = this.config.charTable;

            if (condition) {
                value.split('').forEach(function(string) {
                    $.each(charTable, function(half, all) {
                        string = string.replace(half, all);
                    });
                    replaceText += string;
                });
            }

            if (value !== replaceText) {
                e.target.value = replaceText;
            }
        });

        /**
         * @method _halfKana2fullKana
         * @desc convert full-width kana to half-width kana
         * @param {Object}  e         event Object
         * @param {Boolean} condition convert or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_halfKana2fullKana', function(e, condition) {
            var value = e.target.value || '',
                replaceText = '',
                kanaTable = this.config.kanaTable;

            if (condition) {
                value.split('').forEach(function(kana) {
                    $.each(kanaTable, function(half, all) {
                        kana = kana.replace(half, all);
                    });
                    replaceText += kana;
                });
            }

            if (value !== replaceText) {
                e.target.value = replaceText;
            }
        });

        /**
         * @method _restrict
         * @desc ignore specified string
         * @param {Object}  e    event Object
         * @param {Boolean} type restriction type
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_restrict', function(e, type) {
            var value = e.target.value || '',
                replaceText = '',
                restriction = this.config.restriction[type];

            value.split('').forEach(function(string) {
                replaceText += string.replace(restriction, '');
            });

            if (value !== replaceText) {
                e.target.value = replaceText;
                e.preventDefault();
                e.stopPropagation();
            }
        });

        /**
         * @method _insert
         * @desc insert special string by each type
         * @param {Object}  e    event Object
         * @param {Boolean} type format type
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_insert', function(e, type) {
            setTimeout(function() {
                var value = e.target.value || '';

                switch (type) {
                    // insert hyphen after 3rd number
                    case 'zip':
                        value = value.replace(/\-/g, '');
                        value = value.replace(/(\d{3})(-?\d+)$/, '$1-$2');
                        break;

                    // insert hyphen after inputing each 4th number
                    case 'credit':
                        value = value.replace(/\-/g, '');
                        while (value !== (value = value.replace(/(\d{4})(\d+)$/, '$1-$2'))) {
                            value = value;
                        }
                        break;
                }

                e.target.value = value;
            });
        });

        /**
         * @method _addCreditCompany
         * @desc judge and add credit card company
         * @param {Object}  e         event Object
         * @param {Boolean} condition add or not
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_addCreditCompany', function(e, condition) {
            var credit = (e.target.value || '').replace('-', ''),
                type = 'unknown',
                accountNumber = parseInt(credit.substring(0, 4));

            if (condition) {
                if (/^5/.test(credit)) {
                    type = 'master';
                } else if (/^4/.test(credit)) {
                    type = 'visa';
                } else if (/^3[47]/.test(credit)) {
                    type = 'amex';
                } else if (3528 <= accountNumber && accountNumber <= 3589) {
                    type = 'jcb';
                } else if (
                    (300 <= parseInt(credit.substring(0, 5), 10) && parseInt(credit.substring(0, 5), 10) <= 305) ||
                    '3095' === credit.substring(0, 2) ||
                    '36' === credit.substring(0, 2) ||
                    '38' === credit.substring(0, 2) ||
                    '39' === credit.substring(0, 2)
                ) {
                    type = 'diners';
                }
            }

            // show credit company logo
            $(e.target).trigger('ditectcredit', {creditCardType: type});
        });

        /**
         * @method _remove
         * @desc remove specified element value
         * @param {Object}  e      event Object
         * @param {Boolean} target selector of target element
         * @private
         * @memberof InputHelper
         */
        defineProp(InputHelper.prototype, '_remove', function(e, target) {
            var $target = $(target);

            $target.val('').trigger('input').trigger('blur');
        });

    }());

    /**
     * @method external:"jQuery.fn".inputHelper
     * @desc jquery plugin for input helper
     * @param {String} method   method name you want to execute (only after initialization)
     * @param {Any}    anything Whatever you want (only after initialization)
     * @param {Object} config   input helper config (only before initialization)
     * @param {Object} option   input helper option (only before initialization)
     */
    $.fn.inputHelper = function() {
        var args = Array.prototype.slice.call(arguments);

        if (typeof args[0] === 'string') {
            var $input = $(this),
                inputHelper = $input.data('__jquery-input-helper-instance'),
                method,
                result;

            if (inputHelper) {
                method = args.shift();
                result = inputHelper[method].apply(inputHelper, args);
            }
            return result;
        } else {
            return $(this).each(function() {
                var $input = $(this),
                    inputHelper = $input.data('__jquery-input-helper-instance'),
                    config,
                    option;

                // after initialze
                if (!inputHelper) {
                    config = args[0] || {};
                    option = args[1];

                    if (option) {
                        $input.data('input-helper', option);
                    } else {
                        option = $input.data('input-helper');
                    }

                    if (option) {
                        config.$input = $input;
                        inputHelper = new InputHelper(config, option);
                        $input.data('__jquery-input-helper-instance', inputHelper);
                    }

                    return $input;
                }
            });
        }
    };

}.call(window, jQuery));
