# Install
https://montreal-forced-aligner.readthedocs.io/en/latest/installation.html

```zsh
brew install miniconda
conda install openfst pynini ngram baumwelch
conda create -n aligner -c conda-forge openblas python=3.9.4 openfst pynini ngram baumwelch
conda init zsh
conda activate aligner
pip install montreal-forced-aligner
```

# Data prep
https://montreal-forced-aligner.readthedocs.io/en/latest/data_prep.html
https://github.com/MontrealCorpusTools/MFA-reorganization-scripts/tree/master/Vietnamese

The default format for sound files in Kaldi is .wav. However, if you have sox available on your machine, MFA will use it to convert .flac, .ogg and .aiff files to WAV for Kaldi to process.

Sound files will be ignored if there is no .lab or .TextGrid with the same name as the sound file. The validation utility (Validating data) will print a warning message when this happens and log all such files.

If no .lab file is found, then the aligner will look for any matching .txt files and use those.

`sox CHUYENANUONGDUNG.mp3 CHUYENANUONGDUNG.wav`
Copy text from https://sutamphap.com/chuyen-an-uong-dung/ to `CHUYENANUONGDUNG.lab`

## Dict gen
```zsh
conda activate aligner
# mfa download -h
mfa download acoustic vietnamese
mfa download g2p vietnamese_g2p
# we have a G2P model that can be used to generate the necessary pronunciation dictionary.
# mfa g2p -h # =>
mfa g2p vietnamese_g2p ../nois dict
```


# Align

```zsh
conda activate aligner
mfa thirdparty download
# mfa align -h # => corpus_directory dictionary_path acoustic_model_path output_directory
mfa g2p vietnamese_g2p ../nois nois.dict
mfa align ../nois dict vietnamese .


mfa g2p vietnamese_g2p ../phaps phaps.dict
mfa align ../phaps phaps.dict vietnamese . -c -d -v --config_path config.yml
mfa align buocdautapthien_suHieuBietDunDan phaps.dict vietnamese .

```

`ruby textgrid-to-srt.rb`
https://github.com/Aegisub/Aegisub

# Problems
https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner/issues/247#issuecomment-796539284
```txt
You can train your own model instead of reusing the pretrained model. Or,
you can replace missing phonemes au_T4, au_T6, eu_T5, ieu_T5, oe_T5, uoi2_T2, uoi3_T6, uou_T1, uou_T2, uou_T3 by similar sounding phonemes (for example, same phone but with different tone) in the dictionary file.

```

https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner/issues/97#issuecomment-460871957
```txt
I was wrong. Splitting my files into smaller chunks didn't entirely fix the problem. Even as short as 2 seconds. I assume its because the transcript and the audio don't match exactly.
I was able to transcribe everything by doubling the beam width in aligner/config/basic_align.yaml.
```

https://montreal-forced-aligner.readthedocs.io/en/latest/sound_files.html#duration
```txt
In general, audio segments (sound files for Prosodylab-aligner format or intervals for the TextGrid format) should be less than 30 seconds for best performance (the shorter the faster). We recommend using breaks like breaths or silent pauses (i.e., not associated with a stop closure) to separate the audio segments. For longer segments, setting the beam and retry beam higher than their defaults will allow them to be aligned. The default beam/retry beam is very conservative 10/40, so something like 400/1000 will allow for much longer sequences to be aligned. See Configuration for more details.
```
