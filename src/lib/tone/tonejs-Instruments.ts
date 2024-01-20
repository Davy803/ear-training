import * as Tone from "tone";

/**
 * @fileoverview A sample library and quick-loader for tone.js
 *
 * @author N.P. Brosowsky (nbrosowsky@gmail.com)
 * https://github.com/nbrosowsky/tonejs-instruments
 */

export const InstrumentList = [
  "bass-electric",
  "bassoon",
  "cello",
  "clarinet",
  "contrabass",
  "flute",
  "french-horn",
  "guitar-acoustic",
  "guitar-electric",
  "guitar-nylon",
  "harmonium",
  "harp",
  "piano",
  "saxophone",
  "trombone",
  "trumpet",
  "tuba",
  "violin",
  "xylophone",
] as const;

export type SampleLibraryResult = { [key in InstrumentType]: Tone.Sampler };

export const SampleLibrary = {
  minify: false,
  baseUrl: "/samples/",
  list: InstrumentList,
  onload: undefined,

  load: function (args: SampleLibraryArgs) {
    const finalArgs: SampleLibraryArgs = {
      instruments: args.instruments ?? this.list,
      baseUrl: args.baseUrl ?? this.baseUrl,
      onload: args.onload ?? this.onload,
      minify: args.minify ?? this.minify,
    };

    const returnValue = {} as SampleLibraryResult;

    const instruments = Array.isArray(finalArgs.instruments)
      ? finalArgs.instruments
      : [finalArgs.instruments];

    for (let i = 0; i <= instruments.length - 1; i++) {
      const currentInstrument = instruments[i];
      const toneMap = InstrumentMapping[currentInstrument];
      //Minimize the number of samples to load
      if (finalArgs.minify === true) {
        let minBy = 1;
        if (Object.keys(toneMap).length >= 17) {
          minBy = 2;
        }
        if (Object.keys(toneMap).length >= 33) {
          minBy = 4;
        }
        if (Object.keys(toneMap).length >= 49) {
          minBy = 6;
        }

        const filtered = Object.keys(toneMap).filter(function (_, i) {
          return i % minBy != 0;
        });

        filtered.forEach(function (f) {
          delete toneMap[f];
        });
      }

      returnValue[currentInstrument] = new Tone.Sampler(toneMap, {
        baseUrl: finalArgs.baseUrl + instruments[i] + "/",
        onload: finalArgs.onload,
      });
    }

    return returnValue;
  },
};

type InstrumentMappingType = {
  [key in InstrumentType | string]: Tone.SamplerOptions["urls"];
};

const InstrumentMapping: InstrumentMappingType = {
  // prettier-ignore
  'bass-electric': {
    'A#1': 'As1.mp3',
    'A#3': 'As3.mp3',
    'C#1': 'Cs1.mp3',
    'C#3': 'Cs3.mp3',
    'E1': 'E1.mp3',
    'E3': 'E3.mp3',
    'G1': 'G1.mp3',
    'G3': 'G3.mp3',        
    },
  // prettier-ignore
  'bassoon': {
    'A4': 'A4.mp3',
    'C3': 'C3.mp3',
    'C5': 'C5.mp3',
    'E4': 'E4.mp3',
    'G2': 'G2.mp3',
    'G4': 'G4.mp3',
    'A2': 'A2.mp3',
    },
  // prettier-ignore
  'cello': {
    'E4': 'E4.mp3',
    'F2': 'F2.mp3',
    'F4': 'F4.mp3',
    'G2': 'G2.mp3',
    'G4': 'G4.mp3',
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'B2': 'B2.mp3',
    'B4': 'B4.mp3',
    'C2': 'C2.mp3',
    'C4': 'C4.mp3',
    'D2': 'D2.mp3',
    'D4': 'D4.mp3',
    'E2': 'E2.mp3'
    },
  // prettier-ignore
  'clarinet': {
    'D4': 'D4.mp3',
    'D5': 'D5.mp3',
    'D6': 'D6.mp3',
    'F3': 'F3.mp3',
    'F4': 'F4.mp3',
    'F5': 'F5.mp3',
    'F#6': 'Fs6.mp3',
    'A#3': 'As3.mp3',
    'A#4': 'As4.mp3',
    'A#5': 'As5.mp3',
    'D3': 'D3.mp3'
    },
  // prettier-ignore
  'contrabass': {
    'C2': 'C2.mp3',
    'C#3': 'Cs3.mp3',
    'D2': 'D2.mp3',
    'E2': 'E2.mp3',
    'E3': 'E3.mp3',
    'F#1': 'Fs1.mp3',
    'F#2': 'Fs2.mp3',
    'G1': 'G1.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    'A2': 'A2.mp3',
    'A#1': 'As1.mp3',
    'B3': 'B3.mp3'
    },
  // prettier-ignore
  'flute': {
    'A6': 'A6.mp3',
    'C4': 'C4.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'C7': 'C7.mp3',
    'E4': 'E4.mp3',
    'E5': 'E5.mp3',
    'E6': 'E6.mp3',
    'A4': 'A4.mp3',
    'A5': 'A5.mp3'
    },
  // prettier-ignore
  'french-horn': {
    'D3': 'D3.mp3',
    'D5': 'D5.mp3',
    'D#2': 'Ds2.mp3',
    'F3': 'F3.mp3',
    'F5': 'F5.mp3',
    'G2': 'G2.mp3',
    'A1': 'A1.mp3',
    'A3': 'A3.mp3',
    'C2': 'C2.mp3',
    'C4': 'C4.mp3',
    },
  // prettier-ignore
  'guitar-acoustic': {
    'G2': 'G2.mp3',
    'G4': 'G4.mp3',
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'B2': 'B2.mp3',
    'B4': 'B4.mp3',
    'C3': 'C3.mp3',
    'C5': 'C5.mp3',
    'D2': 'D2.mp3',
    'D4': 'D4.mp3',
    'D5': 'D5.mp3',
    'E2': 'E2.mp3',
    'E4': 'E4.mp3',
    'F2': 'F2.mp3',
    'F4': 'F4.mp3',
    },
  // prettier-ignore
  'guitar-electric': {
    'D#3': 'Ds3.mp3',
    'D#5': 'Ds5.mp3',
    'E2': 'E2.mp3',
    'F#2': 'Fs2.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'A5': 'A5.mp3',
    'C3': 'C3.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'C#2': 'Cs2.mp3'
    },
  // prettier-ignore
  'guitar-nylon': {
    'F#2': 'Fs2.mp3',
    'F#4': 'Fs4.mp3',
    'G#2': 'Gs2.mp3',
    'G#4': 'Gs4.mp3',
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'B1': 'B1.mp3',
    'B2': 'B2.mp3',
    'B4': 'B4.mp3',
    'C#3': 'Cs3.mp3',
    'C#5': 'Cs5.mp3',
    'D2': 'D2.mp3',
    'D#4': 'Ds4.mp3',
    'E2': 'E2.mp3',
    'E4': 'E4.mp3',
    },
  // prettier-ignore
  'harmonium': {
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'B2': 'B2.mp3',
    'B4': 'B4.mp3',
    'C2': 'C2.mp3',
    'C4': 'C4.mp3',
    'C5': 'C5.mp3',
    'D2': 'D2.mp3',
    'D4': 'D4.mp3',
    'D5': 'D5.mp3',
    'E2': 'E2.mp3',
    'E4': 'E4.mp3',
    'F2': 'F2.mp3',
    'F4': 'F4.mp3',
    'G2': 'G2.mp3',
    'G4': 'G4.mp3',
    },
  // prettier-ignore
  'harp': {
    'A2': 'A2.mp3',
    'A4': 'A4.mp3',
    'B1': 'B1.mp3',
    'B5': 'B5.mp3',
    'C3': 'C3.mp3',
    'C5': 'C5.mp3',
    'D4': 'D4.mp3',
    'D6': 'D6.mp3',
    'E3': 'E3.mp3',
    'E5': 'E5.mp3',
    'F2': 'F2.mp3',
    'F6': 'F6.mp3',
    'G1': 'G1.mp3',
    'G5': 'G5.mp3',
    },
  // prettier-ignore
  'piano': {
        'A3': 'A3.mp3',
        'A5': 'A5.mp3',
        'B3': 'B3.mp3',
        'B5': 'B5.mp3',
        'C3': 'C3.mp3',
        'C5': 'C5.mp3',
        'D3': 'D3.mp3',
        'D5': 'D5.mp3',
        'E3': 'E3.mp3',
        'E5': 'E5.mp3',
        'F3': 'F3.mp3',
        'F5': 'F5.mp3',
        'G3': 'G3.mp3',
        'G5': 'G5.mp3',
    },
  // prettier-ignore
  'saxophone': {
    'A5': 'A5.mp3',
    'B3': 'B3.mp3',
    'C5': 'C5.mp3',
    'D3': 'D3.mp3',
    'D5': 'D5.mp3',
    'E3': 'E3.mp3',
    'E5': 'E5.mp3',
    'F3': 'F3.mp3',
    'F5': 'F5.mp3',
    'G3': 'G3.mp3',
    'G5': 'G5.mp3',
    },
  // prettier-ignore
  'trombone': {
    'A#1': 'As1.mp3',
    'A#3': 'As3.mp3',
    'C3': 'C3.mp3',
    'C4': 'C4.mp3',
    'D3': 'D3.mp3',
    'D4': 'D4.mp3',
    'F2': 'F2.mp3',
    'F4': 'F4.mp3',
    'G#2': 'Gs2.mp3',
    'G#3': 'Gs3.mp3',
    },
  // prettier-ignore
  'trumpet': {
    'C6': 'C6.mp3',
    'D5': 'D5.mp3',
    'D#4': 'Ds4.mp3',
    'F3': 'F3.mp3',
    'F4': 'F4.mp3',
    'F5': 'F5.mp3',
    'G4': 'G4.mp3',
    'A3': 'A3.mp3',
    'A5': 'A5.mp3',
    'A#4': 'As4.mp3',
    'C4': 'C4.mp3'

    },
  // prettier-ignore
  'tuba': {
    'A#2': 'As2.mp3',
    'A#3': 'As3.mp3',
    'D3': 'D3.mp3',
    'D4': 'D4.mp3',
    'D#2': 'Ds2.mp3',
    'F1': 'F1.mp3',
    'F2': 'F2.mp3',
    'F3': 'F3.mp3',
    'A#1': 'As1.mp3'

    },
  // prettier-ignore
  'violin': {
    'A3': 'A3.mp3',
    'A5': 'A5.mp3',
    'C4': 'C4.mp3',
    'C6': 'C6.mp3',
    'E4': 'E4.mp3',
    'E6': 'E6.mp3',
    'G4': 'G4.mp3',
    'G6': 'G6.mp3'
    },
  // prettier-ignore
  'xylophone': {
    'C8': 'C8.mp3',
    'G4': 'G4.mp3',
    'G5': 'G5.mp3',
    'G6': 'G6.mp3',
    'G7': 'G7.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'C7': 'C7.mp3'
    },
};

export type InstrumentType = (typeof InstrumentList)[number];

type SampleLibraryArgs = {
  instruments: InstrumentType | [InstrumentType];
  baseUrl?: string;
  onload?: Tone.SamplerOptions["onload"];
  minify?: boolean;
};
