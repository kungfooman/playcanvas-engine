import {
    ADDRESS_REPEAT,
    FILTER_LINEAR, FILTER_NEAREST_MIPMAP_NEAREST, FILTER_NEAREST_MIPMAP_LINEAR, FILTER_LINEAR_MIPMAP_NEAREST, FILTER_LINEAR_MIPMAP_LINEAR,
    FUNC_LESS,
    PIXELFORMAT_A8, PIXELFORMAT_L8, PIXELFORMAT_L8_A8, PIXELFORMAT_R5_G6_B5, PIXELFORMAT_R5_G5_B5_A1, PIXELFORMAT_R4_G4_B4_A4,
    PIXELFORMAT_R8_G8_B8, PIXELFORMAT_R8_G8_B8_A8, PIXELFORMAT_DXT1, PIXELFORMAT_DXT3, PIXELFORMAT_DXT5,
    PIXELFORMAT_RGB16F, PIXELFORMAT_RGBA16F, PIXELFORMAT_RGB32F, PIXELFORMAT_RGBA32F, PIXELFORMAT_R32F, PIXELFORMAT_DEPTH,
    PIXELFORMAT_DEPTHSTENCIL, PIXELFORMAT_111110F, PIXELFORMAT_SRGB, PIXELFORMAT_SRGBA, PIXELFORMAT_ETC1,
    PIXELFORMAT_ETC2_RGB, PIXELFORMAT_ETC2_RGBA, PIXELFORMAT_PVRTC_2BPP_RGB_1, PIXELFORMAT_PVRTC_2BPP_RGBA_1,
    PIXELFORMAT_PVRTC_4BPP_RGB_1, PIXELFORMAT_PVRTC_4BPP_RGBA_1, PIXELFORMAT_ASTC_4x4, PIXELFORMAT_ATC_RGB,
    PIXELFORMAT_ATC_RGBA,
    TEXTURELOCK_WRITE,
    TEXTURETYPE_DEFAULT, TEXTURETYPE_RGBM, TEXTURETYPE_SWIZZLEGGGR
} from './graphics.js';

/**
 * @class
 * @name pc.Texture
 * @classdesc A texture is a container for texel data that can be utilized in a fragment shader.
 * Typically, the texel data represents an image that is mapped over geometry.
 * @description Creates a new texture.
 * @param {pc.GraphicsDevice} graphicsDevice - The graphics device used to manage this texture.
 * @param {object} [options] - Object for passing optional arguments.
 * @param {string} [options.name] - The name of the texture.
 * @param {number} [options.width] - The width of the texture in pixels. Defaults to 4.
 * @param {number} [options.height] - The height of the texture in pixels. Defaults to 4.
 * @param {number} [options.depth] - The number of depth slices in a 3D texture (WebGL2 only). Defaults to 1 (single 2D image).
 * @param {number} [options.format] - The pixel format of the texture. Can be:
 * * {@link pc.PIXELFORMAT_A8}
 * * {@link pc.PIXELFORMAT_L8}
 * * {@link pc.PIXELFORMAT_L8_A8}
 * * {@link pc.PIXELFORMAT_R5_G6_B5}
 * * {@link pc.PIXELFORMAT_R5_G5_B5_A1}
 * * {@link pc.PIXELFORMAT_R4_G4_B4_A4}
 * * {@link pc.PIXELFORMAT_R8_G8_B8}
 * * {@link pc.PIXELFORMAT_R8_G8_B8_A8}
 * * {@link pc.PIXELFORMAT_DXT1}
 * * {@link pc.PIXELFORMAT_DXT3}
 * * {@link pc.PIXELFORMAT_DXT5}
 * * {@link pc.PIXELFORMAT_RGB16F}
 * * {@link pc.PIXELFORMAT_RGBA16F}
 * * {@link pc.PIXELFORMAT_RGB32F}
 * * {@link pc.PIXELFORMAT_RGBA32F}
 * * {@link pc.PIXELFORMAT_ETC1}
 * * {@link pc.PIXELFORMAT_PVRTC_2BPP_RGB_1}
 * * {@link pc.PIXELFORMAT_PVRTC_2BPP_RGBA_1}
 * * {@link pc.PIXELFORMAT_PVRTC_4BPP_RGB_1}
 * * {@link pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1}
 * * {@link pc.PIXELFORMAT_111110F}
 * * {@link pc.PIXELFORMAT_ASTC_4x4}>/li>
 * * {@link pc.PIXELFORMAT_ATC_RGB}
 * * {@link pc.PIXELFORMAT_ATC_RGBA}
 * Defaults to pc.PIXELFORMAT_R8_G8_B8_A8.
 * @param {number} [options.minFilter] - The minification filter type to use. Defaults to {@link pc.FILTER_LINEAR_MIPMAP_LINEAR}
 * @param {number} [options.magFilter] - The magnification filter type to use. Defaults to {@link pc.FILTER_LINEAR}
 * @param {number} [options.anisotropy] - The level of anisotropic filtering to use. Defaults to 1
 * @param {number} [options.addressU] - The repeat mode to use in the U direction. Defaults to {@link pc.ADDRESS_REPEAT}
 * @param {number} [options.addressV] - The repeat mode to use in the V direction. Defaults to {@link pc.ADDRESS_REPEAT}
 * @param {number} [options.addressW] - The repeat mode to use in the W direction. Defaults to {@link pc.ADDRESS_REPEAT}
 * @param {boolean} [options.mipmaps] - When enabled try to generate or use mipmaps for this texture. Default is true
 * @param {boolean} [options.cubemap] - Specifies whether the texture is to be a cubemap. Defaults to false.
 * @param {boolean} [options.volume] - Specifies whether the texture is to be a 3D volume (WebGL2 only). Defaults to false.
 * @param {string} [options.type] - Specifies the image type, see {@link pc.TEXTURETYPE_DEFAULT}
 * @param {boolean} [options.fixCubemapSeams] - Specifies whether this cubemap texture requires special
 * seam fixing shader code to look right. Defaults to false.
 * @param {boolean} [options.flipY] - Specifies whether the texture should be flipped in the Y-direction. Only affects textures
 * with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures or textures set from raw
 * pixel data. Defaults to true.
 * @param {boolean} [options.premultiplyAlpha] - If true, the alpha channel of the texture (if present) is multiplied into the color
 * channels. Defaults to false.
 * @param {boolean} [options.compareOnRead] - When enabled, and if texture format is pc.PIXELFORMAT_DEPTH or pc.PIXELFORMAT_DEPTHSTENCIL,
 * hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
 * Defaults to false.
 * @param {number} [options.compareFunc] - Comparison function when compareOnRead is enabled (WebGL2 only). Defaults to pc.FUNC_LESS.
 * Possible values:
 * * {@link pc.FUNC_LESS}
 * * {@link pc.FUNC_LESSEQUAL}
 * * {@link pc.FUNC_GREATER}
 * * {@link pc.FUNC_GREATEREQUAL}
 * * {@link pc.FUNC_EQUAL}
 * * {@link pc.FUNC_NOTEQUAL}
 * @example
 * // Create a 8x8x24-bit texture
 * var texture = new pc.Texture(graphicsDevice, {
 *     width: 8,
 *     height: 8,
 *     format: pc.PIXELFORMAT_R8_G8_B8
 * });
 *
 * // Fill the texture with a gradient
 * var pixels = texture.lock();
 * var count = 0;
 * for (var i = 0; i < 8; i++) {
 *     for (var j = 0; j < 8; j++) {
 *         pixels[count++] = i * 32;
 *         pixels[count++] = j * 32;
 *         pixels[count++] = 255;
 *     }
 * }
 * texture.unlock();
 * @property {string} name The name of the texture. Defaults to null.
 */
function Texture(graphicsDevice, options) {
    this.device = graphicsDevice;

    this.name = null;
    this._width = 4;
    this._height = 4;
    this._depth = 1;

    this._format = PIXELFORMAT_R8_G8_B8_A8;
    this.type = TEXTURETYPE_DEFAULT;

    this._cubemap = false;
    this._volume = false;
    this.fixCubemapSeams = false;
    this._flipY = true;
    this._premultiplyAlpha = false;

    this._mipmaps = true;

    this._minFilter = FILTER_LINEAR_MIPMAP_LINEAR;
    this._magFilter = FILTER_LINEAR;
    this._anisotropy = 1;
    this._addressU = ADDRESS_REPEAT;
    this._addressV = ADDRESS_REPEAT;
    this._addressW = ADDRESS_REPEAT;

    this._compareOnRead = false;
    this._compareFunc = FUNC_LESS;

    // #ifdef PROFILER
    this.profilerHint = 0;
    // #endif

    if (options !== undefined) {
        if (options.name !== undefined) {
            this.name = options.name;
        }
        this._width = (options.width !== undefined) ? options.width : this._width;
        this._height = (options.height !== undefined) ? options.height : this._height;

        this._format = (options.format !== undefined) ? options.format : this._format;

        if (options.hasOwnProperty('type')) {
            this.type = options.type;
        } else if (options.hasOwnProperty('rgbm')) {
            // #ifdef DEBUG
            console.warn("DEPRECATED: options.rgbm is deprecated. Use options.type instead.");
            // #endif
            this.type = options.rgbm ? TEXTURETYPE_RGBM : TEXTURETYPE_DEFAULT;
        } else if (options.hasOwnProperty('swizzleGGGR')) {
            // #ifdef DEBUG
            console.warn("DEPRECATED: options.swizzleGGGR is deprecated. Use options.type instead.");
            // #endif
            this.type = options.swizzleGGGR ? TEXTURETYPE_SWIZZLEGGGR : TEXTURETYPE_DEFAULT;
        }

        if (options.mipmaps !== undefined) {
            this._mipmaps = options.mipmaps;
        } else {
            this._mipmaps = (options.autoMipmap !== undefined) ? options.autoMipmap : this._mipmaps;
        }

        this._levels = options.levels;

        this._cubemap = (options.cubemap !== undefined) ? options.cubemap : this._cubemap;
        this.fixCubemapSeams = (options.fixCubemapSeams !== undefined) ? options.fixCubemapSeams : this.fixCubemapSeams;

        this._minFilter = (options.minFilter !== undefined) ? options.minFilter : this._minFilter;
        this._magFilter = (options.magFilter !== undefined) ? options.magFilter : this._magFilter;
        this._anisotropy = (options.anisotropy !== undefined) ? options.anisotropy : this._anisotropy;
        this._addressU = (options.addressU !== undefined) ? options.addressU : this._addressU;
        this._addressV = (options.addressV !== undefined) ? options.addressV : this._addressV;

        this._compareOnRead = (options.compareOnRead !== undefined) ? options.compareOnRead : this._compareOnRead;
        this._compareFunc = (options._compareFunc !== undefined) ? options._compareFunc : this._compareFunc;

        this._flipY = (options.flipY !== undefined) ? options.flipY : this._flipY;
        this._premultiplyAlpha = (options.premultiplyAlpha !== undefined) ? options.premultiplyAlpha : this._premultiplyAlpha;

        if (graphicsDevice.webgl2) {
            this._depth = (options.depth !== undefined) ? options.depth : this._depth;
            this._volume = (options.volume !== undefined) ? options.volume : this._volume;
            this._addressW = (options.addressW !== undefined) ? options.addressW : this._addressW;
        }

        // #ifdef PROFILER
        this.profilerHint = (options.profilerHint !== undefined) ? options.profilerHint : this.profilerHint;
        // #endif
    }

    this._compressed = (this._format === PIXELFORMAT_DXT1 ||
                        this._format === PIXELFORMAT_DXT3 ||
                        this._format === PIXELFORMAT_DXT5 ||
                        this._format >= PIXELFORMAT_ETC1);

    // Mip levels
    this._invalid = false;
    this._lockedLevel = -1;
    if (!this._levels) {
        this._levels = this._cubemap ? [[null, null, null, null, null, null]] : [null];
    }

    this.dirtyAll();

    this._gpuSize = 0;
}

Object.defineProperties(Texture.prototype, {
    /**
     * @name pc.Texture#minFilter
     * @type {number}
     * @description The minification filter to be applied to the texture. Can be:
     * * {@link pc.FILTER_NEAREST}
     * * {@link pc.FILTER_LINEAR}
     * * {@link pc.FILTER_NEAREST_MIPMAP_NEAREST}
     * * {@link pc.FILTER_NEAREST_MIPMAP_LINEAR}
     * * {@link pc.FILTER_LINEAR_MIPMAP_NEAREST}
     * * {@link pc.FILTER_LINEAR_MIPMAP_LINEAR}
     */
    minFilter: {
        get: function () {
            return this._minFilter;
        },
        set: function (v) {
            if (this._minFilter !== v) {
                this._minFilter = v;
                this._parameterFlags |= 1;
            }
        }
    },

    /**
     * @name pc.Texture#magFilter
     * @type {number}
     * @description The magnification filter to be applied to the texture. Can be:
     * * {@link pc.FILTER_NEAREST}
     * * {@link pc.FILTER_LINEAR}
     */
    magFilter: {
        get: function () {
            return this._magFilter;
        },
        set: function (v) {
            if (this._magFilter !== v) {
                this._magFilter = v;
                this._parameterFlags |= 2;
            }
        }
    },

    /**
     * @name pc.Texture#addressU
     * @type {number}
     * @description The addressing mode to be applied to the texture horizontally. Can be:
     * * {@link pc.ADDRESS_REPEAT}
     * * {@link pc.ADDRESS_CLAMP_TO_EDGE}
     * * {@link pc.ADDRESS_MIRRORED_REPEAT}
     */
    addressU: {
        get: function () {
            return this._addressU;
        },
        set: function (v) {
            if (this._addressU !== v) {
                this._addressU = v;
                this._parameterFlags |= 4;
            }
        }
    },

    /**
     * @name pc.Texture#addressV
     * @type {number}
     * @description The addressing mode to be applied to the texture vertically. Can be:
     * * {@link pc.ADDRESS_REPEAT}
     * * {@link pc.ADDRESS_CLAMP_TO_EDGE}
     * * {@link pc.ADDRESS_MIRRORED_REPEAT}
     */
    addressV: {
        get: function () {
            return this._addressV;
        },
        set: function (v) {
            if (this._addressV !== v) {
                this._addressV = v;
                this._parameterFlags |= 8;
            }
        }
    },

    /**
     * @name pc.Texture#addressW
     * @type {number}
     * @description The addressing mode to be applied to the 3D texture depth (WebGL2 only). Can be:
     * * {@link pc.ADDRESS_REPEAT}
     * * {@link pc.ADDRESS_CLAMP_TO_EDGE}
     * * {@link pc.ADDRESS_MIRRORED_REPEAT}
     */
    addressW: {
        get: function () {
            return this._addressW;
        },
        set: function (addressW) {
            if (!this.device.webgl2) return;
            if (!this._volume) {
                // #ifdef DEBUG
                console.warn("pc.Texture#addressW: Can't set W addressing mode for a non-3D texture.");
                // #endif
                return;
            }
            if (addressW !== this._addressW) {
                this._addressW = addressW;
                this._parameterFlags |= 16;
            }
        }
    },

    /**
     * @name pc.Texture#compareOnRead
     * @type {boolean}
     * @description When enabled, and if texture format is pc.PIXELFORMAT_DEPTH or pc.PIXELFORMAT_DEPTHSTENCIL,
     * hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
     */
    compareOnRead: {
        get: function () {
            return this._compareOnRead;
        },
        set: function (v) {
            if (this._compareOnRead !== v) {
                this._compareOnRead = v;
                this._parameterFlags |= 32;
            }
        }
    },

    /**
     * @name pc.Texture#compareFunc
     * @type {number}
     * @description Comparison function when compareOnRead is enabled (WebGL2 only).
     * Possible values:
     * * {@link pc.FUNC_LESS}
     * * {@link pc.FUNC_LESSEQUAL}
     * * {@link pc.FUNC_GREATER}
     * * {@link pc.FUNC_GREATEREQUAL}
     * * {@link pc.FUNC_EQUAL}
     * * {@link pc.FUNC_NOTEQUAL}
     */
    compareFunc: {
        get: function () {
            return this._compareFunc;
        },
        set: function (v) {
            if (this._compareFunc !== v) {
                this._compareFunc = v;
                this._parameterFlags |= 64;
            }
        }
    },

    /**
     * @name pc.Texture#anisotropy
     * @type {number}
     * @description Integer value specifying the level of anisotropic to apply to the texture
     * ranging from 1 (no anisotropic filtering) to the {@link pc.GraphicsDevice} property maxAnisotropy.
     */
    anisotropy: {
        get: function () {
            return this._anisotropy;
        },
        set: function (v) {
            if (this._anisotropy !== v) {
                this._anisotropy = v;
                this._parameterFlags |= 128;
            }
        }
    },

    /**
     * @private
     * @deprecated
     * @name pc.Texture#autoMipmap
     * @type {boolean}
     * @description Toggles automatic mipmap generation. Can't be used on non power of two textures.
     */
    autoMipmap: {
        get: function () {
            return this._mipmaps;
        },
        set: function (v) {
            this._mipmaps = v;
        }
    },

    /**
     * @name pc.Texture#mipmaps
     * @type {boolean}
     * @description Defines if texture should generate/upload mipmaps if possible.
     */
    mipmaps: {
        get: function () {
            return this._mipmaps;
        },
        set: function (v) {
            if (this._mipmaps !== v) {
                this._mipmaps = v;
                this._minFilterDirty = true;

                if (v) this._needsMipmapsUpload = true;
            }
        }
    },

    /**
     * @readonly
     * @name pc.Texture#width
     * @type {number}
     * @description The width of the texture in pixels.
     */
    width: {
        get: function () {
            return this._width;
        }
    },

    /**
     * @readonly
     * @name pc.Texture#height
     * @type {number}
     * @description The height of the texture in pixels.
     */
    height: {
        get: function () {
            return this._height;
        }
    },

    /**
     * @readonly
     * @name pc.Texture#depth
     * @type {number}
     * @description The number of depth slices in a 3D texture (WebGL2 only).
     */
    depth: {
        get: function () {
            return this._depth;
        }
    },

    /**
     * @readonly
     * @name pc.Texture#format
     * @type {number}
     * @description The pixel format of the texture. Can be:
     * * {@link pc.PIXELFORMAT_A8}
     * * {@link pc.PIXELFORMAT_L8}
     * * {@link pc.PIXELFORMAT_L8_A8}
     * * {@link pc.PIXELFORMAT_R5_G6_B5}
     * * {@link pc.PIXELFORMAT_R5_G5_B5_A1}
     * * {@link pc.PIXELFORMAT_R4_G4_B4_A4}
     * * {@link pc.PIXELFORMAT_R8_G8_B8}
     * * {@link pc.PIXELFORMAT_R8_G8_B8_A8}
     * * {@link pc.PIXELFORMAT_DXT1}
     * * {@link pc.PIXELFORMAT_DXT3}
     * * {@link pc.PIXELFORMAT_DXT5}
     * * {@link pc.PIXELFORMAT_RGB16F}
     * * {@link pc.PIXELFORMAT_RGBA16F}
     * * {@link pc.PIXELFORMAT_RGB32F}
     * * {@link pc.PIXELFORMAT_RGBA32F}
     * * {@link pc.PIXELFORMAT_ETC1}
     * * {@link pc.PIXELFORMAT_PVRTC_2BPP_RGB_1}
     * * {@link pc.PIXELFORMAT_PVRTC_2BPP_RGBA_1}
     * * {@link pc.PIXELFORMAT_PVRTC_4BPP_RGB_1}
     * * {@link pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1}
     * * {@link pc.PIXELFORMAT_111110F}
     * * {@link pc.PIXELFORMAT_ASTC_4x4}>/li>
     * * {@link pc.PIXELFORMAT_ATC_RGB}
     * * {@link pc.PIXELFORMAT_ATC_RGBA}
     */
    format: {
        get: function () {
            return this._format;
        }
    },

    /**
     * @readonly
     * @name pc.Texture#cubemap
     * @type {boolean}
     * @description Returns true if this texture is a cube map and false otherwise.
     */
    cubemap: {
        get: function () {
            return this._cubemap;
        }
    },

    gpuSize: {
        get: function () {
            var mips = this.pot &&
                    (this._mipmaps ||
                        this._minFilter === FILTER_NEAREST_MIPMAP_NEAREST ||
                        this._minFilter === FILTER_NEAREST_MIPMAP_LINEAR ||
                        this._minFilter === FILTER_LINEAR_MIPMAP_NEAREST ||
                        this._minFilter === FILTER_LINEAR_MIPMAP_LINEAR) &&
                        !(this._compressed && this._levels.length === 1);

            return Texture.calcGpuSize(this._width, this._height, this._depth, this._format, mips, this._cubemap);
        }
    },

    /**
     * @readonly
     * @name pc.Texture#volume
     * @type {boolean}
     * @description Returns true if this texture is a 3D volume and false otherwise.
     */
    volume: {
        get: function () {
            return this._volume;
        }
    },

    /**
     * @name pc.Texture#flipY
     * @type {boolean}
     * @description Specifies whether the texture should be flipped in the Y-direction. Only affects textures
     * with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures
     * or textures set from raw pixel data. Defaults to true.
     */
    flipY: {
        get: function () {
            return this._flipY;
        },
        set: function (flipY) {
            if (this._flipY !== flipY) {
                this._flipY = flipY;
                this._needsUpload = true;
            }
        }
    },

    premultiplyAlpha: {
        get: function () {
            return this._premultiplyAlpha;
        },
        set: function (premultiplyAlpha) {
            if (this._premultiplyAlpha !== premultiplyAlpha) {
                this._premultiplyAlpha = premultiplyAlpha;
                this._needsUpload = true;
            }
        }
    },

    /**
     * @readonly
     * @name pc.Texture#pot
     * @type {boolean}
     * @description Returns true if all dimensions of the texture are power of two, and false otherwise.
     */
    pot: {
        get: function () {
            return pc.math.powerOfTwo(this._width) && pc.math.powerOfTwo(this._height);
        }
    }
});

var _pixelSizeTable = null;
var _blockSizeTable = null;

// static functions
Object.assign(Texture, {
    /**
     * @private
     * @function
     * @name pc.Texture.calcGpuSize
     * @description Calculate the GPU memory required for a texture.
     * @param {number} [width] - Texture's width.
     * @param {number} [height] - Texture's height.
     * @param {number} [depth] - Texture's depth.
     * @param {number} [format] - Texture's pixel format (pc.PIXELFORMAT_***).
     * @param {boolean} [mipmaps] - True if the texture includes mipmaps, false otherwise.
     * @param {boolean} [cubemap] - True is the texture is a cubemap, false otherwise.
     * @returns {number} The amount of GPU memory required for the texture, in bytes.
     */
    calcGpuSize: function (width, height, depth, format, mipmaps, cubemap) {
        if (!_pixelSizeTable) {
            _pixelSizeTable = [];
            _pixelSizeTable[PIXELFORMAT_A8] = 1;
            _pixelSizeTable[PIXELFORMAT_L8] = 1;
            _pixelSizeTable[PIXELFORMAT_L8_A8] = 1;
            _pixelSizeTable[PIXELFORMAT_R5_G6_B5] = 2;
            _pixelSizeTable[PIXELFORMAT_R5_G5_B5_A1] = 2;
            _pixelSizeTable[PIXELFORMAT_R4_G4_B4_A4] = 2;
            _pixelSizeTable[PIXELFORMAT_R8_G8_B8] = 4;
            _pixelSizeTable[PIXELFORMAT_R8_G8_B8_A8] = 4;
            _pixelSizeTable[PIXELFORMAT_RGB16F] = 8;
            _pixelSizeTable[PIXELFORMAT_RGBA16F] = 8;
            _pixelSizeTable[PIXELFORMAT_RGB32F] = 16;
            _pixelSizeTable[PIXELFORMAT_RGBA32F] = 16;
            _pixelSizeTable[PIXELFORMAT_R32F] = 4;
            _pixelSizeTable[PIXELFORMAT_DEPTH] = 4; // can be smaller using WebGL1 extension?
            _pixelSizeTable[PIXELFORMAT_DEPTHSTENCIL] = 4;
            _pixelSizeTable[PIXELFORMAT_111110F] = 4;
            _pixelSizeTable[PIXELFORMAT_SRGB] = 4;
            _pixelSizeTable[PIXELFORMAT_SRGBA] = 4;
        }

        if (!_blockSizeTable) {
            _blockSizeTable = [];
            _blockSizeTable[PIXELFORMAT_ETC1] = 8;
            _blockSizeTable[PIXELFORMAT_ETC2_RGB] = 8;
            _blockSizeTable[PIXELFORMAT_PVRTC_2BPP_RGB_1] = 8;
            _blockSizeTable[PIXELFORMAT_PVRTC_2BPP_RGBA_1] = 8;
            _blockSizeTable[PIXELFORMAT_PVRTC_4BPP_RGB_1] = 8;
            _blockSizeTable[PIXELFORMAT_PVRTC_4BPP_RGBA_1] = 8;
            _blockSizeTable[PIXELFORMAT_DXT1] = 8;
            _blockSizeTable[PIXELFORMAT_ATC_RGB] = 8;
            _blockSizeTable[PIXELFORMAT_ETC2_RGBA] = 16;
            _blockSizeTable[PIXELFORMAT_DXT3] = 16;
            _blockSizeTable[PIXELFORMAT_DXT5] = 16;
            _blockSizeTable[PIXELFORMAT_ASTC_4x4] = 16;
            _blockSizeTable[PIXELFORMAT_ATC_RGBA] = 16;
        }

        var pixelSize = _pixelSizeTable.hasOwnProperty(format) ? _pixelSizeTable[format] : 0;
        var blockSize = _blockSizeTable.hasOwnProperty(format) ? _blockSizeTable[format] : 0;
        var result = 0;

        while (1) {
            if (pixelSize > 0) {
                // handle uncompressed formats
                result += width * height * depth * pixelSize;
            } else {
                // handle block formats
                var blockWidth = Math.floor((width + 3) / 4);
                var blockHeight = Math.floor((height + 3) / 4);
                var blockDepth = Math.floor((depth + 3) / 4);

                if (format === PIXELFORMAT_PVRTC_2BPP_RGB_1 ||
                    format === PIXELFORMAT_PVRTC_2BPP_RGBA_1) {
                    blockWidth = Math.floor(blockWidth / 2, 1);
                }

                result += blockWidth * blockHeight * blockDepth * blockSize;
            }
            // we're done if mipmaps aren't required or we've calculated the smallest mipmap level
            if (!mipmaps || ((width === 1) && (height === 1) && (depth === 1))) {
                break;
            }
            width = Math.max(Math.floor(width / 2), 1);
            height = Math.max(Math.floor(height / 2), 1);
            depth = Math.max(Math.floor(depth / 2), 1);
        }

        return result * (cubemap ? 6 : 1);
    }
});

// Public methods
Object.assign(Texture.prototype, {
    /**
     * @function
     * @name pc.Texture#destroy
     * @description Forcibly free up the underlying WebGL resource owned by the texture.
     */
    destroy: function () {
        if (this.device) {
            this.device.destroyTexture(this);
        }
        this.device = null;
        this._levels = null;
    },

    // Force a full resubmission of the texture to WebGL (used on a context restore event)
    dirtyAll: function () {
        this._levelsUpdated = this._cubemap ? [[true, true, true, true, true, true]] : [true];

        this._needsUpload = true;
        this._needsMipmapsUpload = this._mipmaps;
        this._mipmapsUploaded = false;

        this._parameterFlags = 255; // 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128
    },

    /**
     * @function
     * @name pc.Texture#lock
     * @description Locks a miplevel of the texture, returning a typed array to be filled with pixel data.
     * @param {object} [options] - Optional options object. Valid properties are as follows:
     * @param {number} [options.level] - The mip level to lock with 0 being the top level. Defaults to 0.
     * @param {number} [options.face] - If the texture is a cubemap, this is the index of the face to lock.
     * @returns {Uint8Array|Uint16Array|Float32Array} A typed array containing the pixel data of the locked mip level.
     */
    lock: function (options) {
        // Initialize options to some sensible defaults
        options = options || { level: 0, face: 0, mode: TEXTURELOCK_WRITE };
        if (options.level === undefined) {
            options.level = 0;
        }
        if (options.face === undefined) {
            options.face = 0;
        }
        if (options.mode === undefined) {
            options.mode = TEXTURELOCK_WRITE;
        }

        this._lockedLevel = options.level;

        if (this._levels[options.level] === null) {
            switch (this._format) {
                case PIXELFORMAT_A8:
                case PIXELFORMAT_L8:
                    this._levels[options.level] = new Uint8Array(this._width * this._height * this._depth);
                    break;
                case PIXELFORMAT_L8_A8:
                    this._levels[options.level] = new Uint8Array(this._width * this._height *  this._depth * 2);
                    break;
                case PIXELFORMAT_R5_G6_B5:
                case PIXELFORMAT_R5_G5_B5_A1:
                case PIXELFORMAT_R4_G4_B4_A4:
                    this._levels[options.level] = new Uint16Array(this._width * this._height * this._depth);
                    break;
                case PIXELFORMAT_R8_G8_B8:
                    this._levels[options.level] = new Uint8Array(this._width * this._height * this._depth * 3);
                    break;
                case PIXELFORMAT_R8_G8_B8_A8:
                    this._levels[options.level] = new Uint8Array(this._width * this._height * this._depth * 4);
                    break;
                case PIXELFORMAT_DXT1:
                    this._levels[options.level] = new Uint8Array(Math.floor((this._width + 3) / 4) * Math.floor((this._height + 3) / 4) * 8 * this._depth);
                    break;
                case PIXELFORMAT_DXT3:
                case PIXELFORMAT_DXT5:
                    this._levels[options.level] = new Uint8Array(Math.floor((this._width + 3) / 4) * Math.floor((this._height + 3) / 4) * 16 * this._depth);
                    break;
                case PIXELFORMAT_RGB16F:
                    this._levels[options.level] = new Uint16Array(this._width * this._height * this._depth * 3);
                    break;
                case PIXELFORMAT_RGB32F:
                    this._levels[options.level] = new Float32Array(this._width * this._height * this._depth * 3);
                    break;
                case PIXELFORMAT_RGBA16F:
                    this._levels[options.level] = new Uint16Array(this._width * this._height * this._depth * 4);
                    break;
                case PIXELFORMAT_RGBA32F:
                    this._levels[options.level] = new Float32Array(this._width * this._height * this._depth * 4);
                    break;
            }
        }

        return this._levels[options.level];
    },

    /**
     * @function
     * @name pc.Texture#setSource
     * @description Set the pixel data of the texture from a canvas, image, video DOM element. If the
     * texture is a cubemap, the supplied source must be an array of 6 canvases, images or videos.
     * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement|HTMLCanvasElement[]|HTMLImageElement[]|HTMLVideoElement[]} source - A canvas, image or video element,
     * or an array of 6 canvas, image or video elements.
     * @param {number} [mipLevel] - A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
     * A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
     */
    setSource: function (source, mipLevel) {
        var i;
        var invalid = false;
        var width, height;

        mipLevel = mipLevel || 0;

        if (this._cubemap) {
            if (source[0]) {
                // rely on first face sizes
                width = source[0].width || 0;
                height = source[0].height || 0;

                for (i = 0; i < 6; i++) {
                    var face = source[i];
                    // cubemap becomes invalid if any condition is not satisfied
                    if (!face ||                  // face is missing
                        face.width !== width ||   // face is different width
                        face.height !== height || // face is different height
                        !this.device._isBrowserInterface(face)) {            // new image bitmap
                        invalid = true;
                        break;
                    }
                }
            } else {
                // first face is missing
                invalid = true;
            }

            if (!invalid) {
                // mark levels as updated
                for (i = 0; i < 6; i++) {
                    if (this._levels[mipLevel][i] !== source[i])
                        this._levelsUpdated[mipLevel][i] = true;
                }
            }
        } else {
            // check if source is valid type of element
            if (!this.device._isBrowserInterface(source))
                invalid = true;

            if (!invalid) {
                // mark level as updated
                if (source !== this._levels[mipLevel])
                    this._levelsUpdated[mipLevel] = true;

                width = source.width;
                height = source.height;
            }
        }

        if (invalid) {
            // invalid texture

            // default sizes
            this._width = 4;
            this._height = 4;

            // remove levels
            if (this._cubemap) {
                for (i = 0; i < 6; i++) {
                    this._levels[mipLevel][i] = null;
                    this._levelsUpdated[mipLevel][i] = true;
                }
            } else {
                this._levels[mipLevel] = null;
                this._levelsUpdated[mipLevel] = true;
            }
        } else {
            // valid texture
            if (mipLevel === 0) {
                this._width = width;
                this._height = height;
            }

            this._levels[mipLevel] = source;
        }

        // valid or changed state of validity
        if (this._invalid !== invalid || !invalid) {
            this._invalid = invalid;

            // reupload
            this.upload();
        }
    },

    /**
     * @function
     * @name pc.Texture#getSource
     * @description Get the pixel data of the texture. If this is a cubemap then an array of 6 images will be returned otherwise
     * a single image.
     * @param {number} [mipLevel] - A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
     * A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
     * @returns {HTMLImageElement} The source image of this texture. Can be null if source not assigned for specific image level.
     */
    getSource: function (mipLevel) {
        mipLevel = mipLevel || 0;
        return this._levels[mipLevel];
    },

    /**
     * @function
     * @name pc.Texture#unlock
     * @description Unlocks the currently locked mip level and uploads it to VRAM.
     */
    unlock: function () {
        // #ifdef DEBUG
        if (this._lockedLevel === -1) {
            console.log("pc.Texture#unlock: Attempting to unlock a texture that is not locked.");
        }
        // #endif

        // Upload the new pixel data
        this.upload();
        this._lockedLevel = -1;
    },

    /**
     * @function
     * @name pc.Texture#upload
     * @description Forces a reupload of the textures pixel data to graphics memory. Ordinarily, this function
     * is called by internally by {@link pc.Texture#setSource} and {@link pc.Texture#unlock}. However, it still needs to
     * be called explicitly in the case where an HTMLVideoElement is set as the source of the texture.  Normally,
     * this is done once every frame before video textured geometry is rendered.
     */
    upload: function () {
        this._needsUpload = true;
        this._needsMipmapsUpload = this._mipmaps;
    },

    getDds: function () {
        if (this.format !== PIXELFORMAT_R8_G8_B8_A8)
            console.error("This format is not implemented yet");

        var fsize = 128;
        var i = 0;
        var j;
        var face;
        while (this._levels[i]) {
            var mipSize;
            if (!this.cubemap) {
                mipSize = this._levels[i].length;
                if (!mipSize) {
                    console.error("No byte array for mip " + i);
                    return;
                }
                fsize += mipSize;
            } else {
                for (face = 0; face < 6; face++) {
                    if (!this._levels[i][face]) {
                        console.error('No level data for mip ' + i + ', face ' + face);
                        return;
                    }
                    mipSize = this._levels[i][face].length;
                    if (!mipSize) {
                        console.error("No byte array for mip " + i + ", face " + face);
                        return;
                    }
                    fsize += mipSize;
                }
            }
            fsize += this._levels[i].length;
            i++;
        }

        var buff = new ArrayBuffer(fsize);
        var header = new Uint32Array(buff, 0, 128 / 4);

        var DDS_MAGIC = 542327876; // "DDS"
        var DDS_HEADER_SIZE = 124;
        var DDS_FLAGS_REQUIRED = 0x01 | 0x02 | 0x04 | 0x1000 | 0x80000; // caps | height | width | pixelformat | linearsize
        var DDS_FLAGS_MIPMAP = 0x20000;
        var DDS_PIXELFORMAT_SIZE = 32;
        var DDS_PIXELFLAGS_RGBA8 = 0x01 | 0x40; // alpha | rgb
        var DDS_CAPS_REQUIRED = 0x1000;
        var DDS_CAPS_MIPMAP = 0x400000;
        var DDS_CAPS_COMPLEX = 0x8;
        var DDS_CAPS2_CUBEMAP = 0x200 | 0x400 | 0x800 | 0x1000 | 0x2000 | 0x4000 | 0x8000; // cubemap | all faces

        var flags = DDS_FLAGS_REQUIRED;
        if (this._levels.length > 1) flags |= DDS_FLAGS_MIPMAP;

        var caps = DDS_CAPS_REQUIRED;
        if (this._levels.length > 1) caps |= DDS_CAPS_MIPMAP;
        if (this._levels.length > 1 || this.cubemap) caps |= DDS_CAPS_COMPLEX;

        var caps2 = this.cubemap ? DDS_CAPS2_CUBEMAP : 0;

        header[0] = DDS_MAGIC;
        header[1] = DDS_HEADER_SIZE;
        header[2] = flags;
        header[3] = this.height;
        header[4] = this.width;
        header[5] = this.width * this.height * 4;
        header[6] = 0; // depth
        header[7] = this._levels.length;
        for (i = 0; i < 11; i++) header[8 + i] = 0;
        header[19] = DDS_PIXELFORMAT_SIZE;
        header[20] = DDS_PIXELFLAGS_RGBA8;
        header[21] = 0; // fourcc
        header[22] = 32; // bpp
        header[23] = 0x00FF0000; // R mask
        header[24] = 0x0000FF00; // G mask
        header[25] = 0x000000FF; // B mask
        header[26] = 0xFF000000; // A mask
        header[27] = caps;
        header[28] = caps2;
        header[29] = 0;
        header[30] = 0;
        header[31] = 0;

        var offset = 128;
        var level, mip;
        if (!this.cubemap) {
            for (i = 0; i < this._levels.length; i++) {
                level = this._levels[i];
                mip = new Uint8Array(buff, offset, level.length);
                for (j = 0; j < level.length; j++) mip[j] = level[j];
                offset += level.length;
            }
        } else {
            for (face = 0; face < 6; face++) {
                for (i = 0; i < this._levels.length; i++) {
                    level = this._levels[i][face];
                    mip = new Uint8Array(buff, offset, level.length);
                    for (j = 0; j < level.length; j++) mip[j] = level[j];
                    offset += level.length;
                }
            }
        }

        return buff;
    }
});

export { Texture };
