"""[summary]
"""

from HSKVocabSite.apps.HSKVocabSiteApp.models import Hsklevels
from HSKVocabSite.apps.HSKVocabSiteApp.models import Vocab


DATAPATH = '/home/matt/Desktop/Work/CV/Projects/HSKVocabSiteRepo/data/lists/HSK2012_Vocab/'

#For each HSK Vocab Level dataset
for i in range(1,7):
    with open(DATAPATH+'L'+str(i)+'.txt') as vocabfile:
        print('Vocab for HSK'+str(i))
        lines = [line.strip() for line in vocabfile]

        #For each vocab item in dataset
        for line in lines:
            items = line.split("\t")

            vocabentry = Vocab(
                characters_simplified=items[0],
                characters_traditional=items[1],
                pinyin_numbers=items[2],
                pinyin_markings=items[3],
                definitions=items[4],
                hsklevel=Hsklevels.objects.get(idhsklevel='hsk'+str(i)),
                )

            vocabentry.save()
        print('Finished HSK'+str(i))


