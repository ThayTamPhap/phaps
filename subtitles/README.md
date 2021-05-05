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
mfa align ../nois dict vietnamese .
cat nois-CHUYENANUONGDUNG.TextGrid
```

https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner/issues/247#issuecomment-796539284
```txt
You can train your own model instead of reusing the pretrained model. Or,
you can replace missing phonemes au_T4, au_T6, eu_T5, ieu_T5, oe_T5, uoi2_T2, uoi3_T6, uou_T1, uou_T2, uou_T3 by similar sounding phonemes (for example, same phone but with different tone) in the dictionary file.
```


`ruby textgrid-to-srt.rb > ../nois/CHUYENANUONGDUNG.srt`
https://github.com/Aegisub/Aegisub
