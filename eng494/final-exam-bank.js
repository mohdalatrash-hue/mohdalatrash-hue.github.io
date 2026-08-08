(function(){
"use strict";

window.ENG494_FINAL_BANK = {
  version: "2026-08-08-public-a",
  durationMinutes: 90,
  objectiveMarks: 30,
  evaluationMarks: 20,
  units: [
    {id:"u1", n:1, title:"Adult Prose", subtitle:"Style · register · dialect · cultural gaps", color:"#c2410c"},
    {id:"u2", n:2, title:"Children's Literature", subtitle:"Voice · dialogue · multimodality · sound", color:"#0d9488"},
    {id:"u3", n:3, title:"Adult Poetry", subtitle:"Strategy · form · sound · imagery", color:"#7c3aed"},
    {id:"u4", n:4, title:"Children's Poetry & Song", subtitle:"Singability · wordplay · read-aloud quality", color:"#db2777"},
    {id:"u5", n:5, title:"Drama & Adaptation", subtitle:"Speakability · performance · honest adaptation", color:"#2563eb"}
  ],
  objective: [
    {
      id:"u1-01", unit:"u1", type:"mcq", tag:"Register & tone",
      prompt:"The source narrator describes a pompous official in elevated, quietly ironic language. The Arabic version reads: «راح يتكلم كأنه واحد مهم، يعني، وكذا». What is the main problem?",
      options:[
        {id:"a", text:"The Arabic needs a footnote explaining the official's title."},
        {id:"b", text:"The elevated ironic register has been flattened into vague casual speech."},
        {id:"c", text:"The translator should invent a regional Arabic dialect for the narrator."},
        {id:"d", text:"The translation is successful because it communicates the basic event."}
      ], answer:"b",
      rationale:"Meaning is not only propositional. The official's pompous register and the narrator's irony are part of the literary effect; vague filler erases both."
    },
    {
      id:"u1-02", unit:"u1", type:"mcq", tag:"Dialect",
      source:"Source character: strongly marked nineteenth-century Yorkshire speech.",
      prompt:"Version A uses a recognisable modern Najdi dialect throughout. Version B removes every speech marker and uses neutral MSA. Which evaluation is strongest?",
      options:[
        {id:"a", text:"A is automatically faithful because both varieties are dialects."},
        {id:"b", text:"B is automatically faithful because standard language is always safer."},
        {id:"c", text:"A falsely relocates the character; B erases markedness. A controlled, non-specific spoken register with compensation is safer."},
        {id:"d", text:"Both are equally correct because dialect has no literary function."}
      ], answer:"c",
      rationale:"A real target-language dialect imports its own geography and social history. Total standardisation loses character. Landers favours limited, non-specific marking and compensation."
    },
    {
      id:"u1-03", unit:"u1", type:"tf", tag:"Style",
      prompt:"True or false: If every proposition is preserved, breaking one long, breathless source sentence into six short Arabic sentences is stylistically neutral.",
      options:[{id:"t",text:"True"},{id:"f",text:"False"}], answer:"f",
      rationale:"Sentence movement, pace and accumulation are stylistic. A series of short sentences may reverse the source's breathless or cumulative effect."
    },
    {
      id:"u1-04", unit:"u1", type:"multi", tag:"Interpolation",
      prompt:"At the first occurrence, the translator writes «فافيلا، أي حيّ عشوائي مكتظ»، then uses «فافيلا» alone afterwards. Select the TWO accurate descriptions.",
      options:[
        {id:"a", text:"This is a brief interpolation."},
        {id:"b", text:"This permits concise reuse of the source term later."},
        {id:"c", text:"This is an omission of the cultural item."},
        {id:"d", text:"This is a footnote that interrupts the fictional flow."}
      ], answer:["a","b"],
      rationale:"The explanation is woven briefly into the sentence, then the source term can carry the meaning without repeated explanation."
    },
    {
      id:"u1-05", unit:"u1", type:"match", tag:"Cultural gaps",
      prompt:"Match each intervention to its best description.",
      choices:[
        {id:"footnote", text:"Footnote"},
        {id:"interpolation", text:"Interpolation"},
        {id:"omission", text:"Omission of explanation"},
        {id:"compensation", text:"Compensation"}
      ],
      rows:[
        {id:"r1", text:"Move the reader outside the fiction to a note at the bottom of the page.", answer:"footnote"},
        {id:"r2", text:"Add two unobtrusive clarifying words inside the sentence.", answer:"interpolation"},
        {id:"r3", text:"Leave the unfamiliar currency unexplained and let context establish its scale.", answer:"omission"},
        {id:"r4", text:"Recreate a lost comic or dialectal effect at a different workable point.", answer:"compensation"}
      ],
      rationale:"The four interventions differ in where explanation or effect is placed, and in how strongly they interrupt the literary experience."
    },
    {
      id:"u1-06", unit:"u1", type:"mcq", tag:"Money & culture",
      prompt:"A historical Brazilian novel mentions «fifty mil-réis». The Arabic translation converts this to an exact present-day Saudi-riyal amount. What is the best repair when the precise value is not plot-critical?",
      options:[
        {id:"a", text:"Keep the precise modern conversion because exact numbers are always more faithful."},
        {id:"b", text:"Delete the entire sentence."},
        {id:"c", text:"Retain the historical term or amount and let context self-level, adding only minimal help if genuinely necessary."},
        {id:"d", text:"Add a full economic history in a footnote."}
      ], answer:"c",
      rationale:"A precise modern conversion creates false certainty and rapidly dates the translation. Context often gives the reader enough sense of scale."
    },

    {
      id:"u2-01", unit:"u2", type:"mcq", tag:"Modes of address",
      source:"The narrator tells the child what happened while quietly giving the adult reader a second, ironic meaning.",
      prompt:"The Arabic version preserves the event but removes the adult-directed irony. What has been lost?",
      options:[
        {id:"a", text:"Single address has become double address."},
        {id:"b", text:"Double address has been reduced to single address."},
        {id:"c", text:"The visual inscription has been mistranslated."},
        {id:"d", text:"The child character has acquired a regional dialect."}
      ], answer:"b",
      rationale:"Double address speaks to the child while simultaneously offering another level to the adult. Removing the second level changes the narrator-reader relationship."
    },
    {
      id:"u2-02", unit:"u2", type:"mcq", tag:"Child dialogue",
      prompt:"A timeless children's novel is translated using the most fashionable social-media slang of 2026 in nearly every line of teenage dialogue. What is the principal risk?",
      options:[
        {id:"a", text:"The dialogue may date quickly and overpower character with a temporary trend."},
        {id:"b", text:"Children never use slang, so all slang is inaccurate."},
        {id:"c", text:"The translation should instead use highly literary classical Arabic in every exchange."},
        {id:"d", text:"The slang will make the pictures impossible to reproduce."}
      ], answer:"a",
      rationale:"Lathey stresses convincing young speech but warns that fashionable slang is ephemeral. A lively, durable register is usually more sustainable."
    },
    {
      id:"u2-03", unit:"u2", type:"tf", tag:"Word & image",
      prompt:"True or false: If a picture deliberately shows a red door while the narration calls it green, the translator should silently change the text to red so that words and image agree.",
      options:[{id:"t",text:"True"},{id:"f",text:"False"}], answer:"f",
      rationale:"Text-image contradiction may be meaningful, comic or narratively important. The translator must investigate the relationship, not silently correct it."
    },
    {
      id:"u2-04", unit:"u2", type:"multi", tag:"Comics & sound",
      prompt:"A comic places the sound effect CRASH! inside the drawing of a window breaking. Select the TWO priorities for an Arabic edition.",
      options:[
        {id:"a", text:"Choose an Arabic sound form with comparable impact and read-aloud force."},
        {id:"b", text:"Coordinate lettering, placement and right-to-left visual flow with the image."},
        {id:"c", text:"Move every sound effect into academic footnotes."},
        {id:"d", text:"Leave the English lettering untouched because images are outside translation."}
      ], answer:["a","b"],
      rationale:"In comics, sound, lettering and placement are part of meaning. Linguistic replacement and visual integration have to be solved together."
    },
    {
      id:"u2-05", unit:"u2", type:"match", tag:"Children's literature",
      prompt:"Match each feature to the translator's central question.",
      choices:[
        {id:"voice", text:"Narrative voice"},
        {id:"dialogue", text:"Child dialogue"},
        {id:"sound", text:"Onomatopoeia"},
        {id:"inscription", text:"Visual inscription"}
      ],
      rows:[
        {id:"r1", text:"Who is speaking to the child, and with what warmth or distance?", answer:"voice"},
        {id:"r2", text:"Would a child of this age plausibly say this aloud?", answer:"dialogue"},
        {id:"r3", text:"What form will a target child naturally recognise and vocalise?", answer:"sound"},
        {id:"r4", text:"Can the translated wording still fit and function inside the picture?", answer:"inscription"}
      ],
      rationale:"Children's translation coordinates reader relationship, believable speech, sound convention and the physical image-text system."
    },
    {
      id:"u2-06", unit:"u2", type:"mcq", tag:"Child narrator",
      source:"I was very, very brave. Except my knees.",
      prompt:"Which evaluation of «كنت شجاعًا جدًا، جدًا... إلا أن ركبتيَّ لم تقتنعا!» is strongest?",
      options:[
        {id:"a", text:"It is unacceptable because it does not translate every word literally."},
        {id:"b", text:"It preserves child-facing rhythm and comic timing, while slightly personifying the knees; that shift should be judged by effect."},
        {id:"c", text:"It fails because Arabic children's literature cannot use humour."},
        {id:"d", text:"It requires a footnote explaining bravery."}
      ], answer:"b",
      rationale:"The version speaks naturally and preserves the punchline. Its small addition is best evaluated as a purposeful effect-level choice, not automatically rejected."
    },

    {
      id:"u3-01", unit:"u3", type:"mcq", tag:"Phonemic strategy",
      prompt:"An Arabic version deliberately repeats /m/ and long vowels to echo the source's humming sound, while allowing some semantic detail to shift. Which strategy is dominant?",
      options:[
        {id:"a", text:"Phonemic translation"},
        {id:"b", text:"Verse-to-prose translation"},
        {id:"c", text:"Literal translation"},
        {id:"d", text:"Omission"}
      ], answer:"a",
      rationale:"Phonemic translation prioritises recreation of source sound while attempting to carry meaning, accepting that the two aims may conflict."
    },
    {
      id:"u3-02", unit:"u3", type:"mcq", tag:"Strategy diagnosis",
      prompt:"A student labels a tightly rhymed Arabic poem with a consistent AABB pattern as “free verse” because the source poem had a different rhyme scheme. What is wrong?",
      options:[
        {id:"a", text:"Nothing; strategy labels describe only the source poem."},
        {id:"b", text:"The Arabic method is rhymed translation; using a different scheme does not make it free verse."},
        {id:"c", text:"Every translation with line breaks is metrical translation."},
        {id:"d", text:"AABB is prose, not verse."}
      ], answer:"b",
      rationale:"Strategy is identified by what the translation actually does. A deliberately maintained end-rhyme scheme is rhymed translation."
    },
    {
      id:"u3-03", unit:"u3", type:"tf", tag:"Rhyme & form",
      prompt:"True or false: A rhymed Arabic translation automatically fails if its rhyme scheme differs from the English source, even when the new scheme is consistent and the change is justified.",
      options:[{id:"t",text:"True"},{id:"f",text:"False"}], answer:"f",
      rationale:"A changed but coherent target scheme can be defensible. The evaluator should examine what the new scheme preserves, what it costs and whether the choice is justified."
    },
    {
      id:"u3-04", unit:"u3", type:"multi", tag:"Evaluating trade-offs",
      prompt:"Rhyme forces a translator to replace a central source metaphor with a different image. Select the TWO things a strong evaluation must do.",
      options:[
        {id:"a", text:"Identify the semantic and imagistic change precisely."},
        {id:"b", text:"Explain what the rhyme gains and whether compensation makes the trade defensible."},
        {id:"c", text:"Declare that rhyme excuses every change automatically."},
        {id:"d", text:"Discuss only whether the final words sound similar."}
      ], answer:["a","b"],
      rationale:"Evaluation requires an explicit loss-gain account: what changed, what formal effect was purchased and whether the exchange serves the poem."
    },
    {
      id:"u3-05", unit:"u3", type:"match", tag:"Six strategies",
      prompt:"Match the translation product to its dominant strategy.",
      choices:[
        {id:"literal", text:"Literal"},
        {id:"metrical", text:"Metrical"},
        {id:"prose", text:"Verse-to-prose"},
        {id:"rhymed", text:"Rhymed"}
      ],
      rows:[
        {id:"r1", text:"Prioritises close lexical sense even when the result is awkward.", answer:"literal"},
        {id:"r2", text:"Rebuilds the source's rhythmic measure as the main constraint.", answer:"metrical"},
        {id:"r3", text:"Removes lineation and presents the poem as a paragraph.", answer:"prose"},
        {id:"r4", text:"Organises Arabic line endings into a sustained sound pattern.", answer:"rhymed"}
      ],
      rationale:"The dominant constraint—not the student's label—determines which strategy a version exemplifies."
    },
    {
      id:"u3-06", unit:"u3", type:"mcq", tag:"Metaphor",
      source:"“Hope” is the thing with feathers / That perches in the soul —",
      prompt:"Version A says «الأمل هو الشيء ذو الريش الذي يجثم في الروح». Version B says «الأمل طائرٌ يعشّش في الروح». Which judgment is best?",
      options:[
        {id:"a", text:"A must be better because every dictionary equivalent appears."},
        {id:"b", text:"B creates a more natural Arabic metaphor but shifts “thing/perches” to “bird/nests”; its gain and shift should both be acknowledged."},
        {id:"c", text:"B is not a translation because metaphor can never change."},
        {id:"d", text:"Both versions are phonemic translations."}
      ], answer:"b",
      rationale:"B strengthens poetic naturalness and activates the implied bird, but it also makes the implication explicit and changes the action. Good evaluation records both."
    },

    {
      id:"u4-01", unit:"u4", type:"mcq", tag:"Singability",
      prompt:"A nursery-song translation conveys every image accurately but each Arabic line requires nearly twice as many beats as the fixed melody allows. What is the decisive weakness?",
      options:[
        {id:"a", text:"It lacks a bibliography."},
        {id:"b", text:"It is not singable to the required tune."},
        {id:"c", text:"It contains no regional dialect."},
        {id:"d", text:"It should have been translated as prose."}
      ], answer:"b",
      rationale:"When the commission is a song set to a fixed melody, physical fit, stress and breath are functional requirements, not decorative extras."
    },
    {
      id:"u4-02", unit:"u4", type:"mcq", tag:"Animal cries",
      prompt:"A children's song translates “cock-a-doodle-doo” by copying its English sounds letter-for-letter into Arabic, producing a form no Arabic-speaking child recognises. What is the best first repair?",
      options:[
        {id:"a", text:"Use a conventional or deliberately playful Arabic rooster cry and test it aloud in the song."},
        {id:"b", text:"Replace the rooster with a dictionary definition of poultry."},
        {id:"c", text:"Delete the sound because animal cries cannot be translated."},
        {id:"d", text:"Explain English farm culture in a footnote."}
      ], answer:"a",
      rationale:"Animal cries are language conventions. The translator may use the target convention or purposeful foreignisation, but the choice must work for a child and for the tune."
    },
    {
      id:"u4-03", unit:"u4", type:"tf", tag:"Limerick form",
      prompt:"True or false: A five-line comic translation that loses AABBA and makes lines 3–4 the longest lines can still be described as preserving the limerick's form.",
      options:[{id:"t",text:"True"},{id:"f",text:"False"}], answer:"f",
      rationale:"Five lines alone do not preserve the mould. The AABBA pattern, shorter central couplet and characteristic rhythmic movement are structural features."
    },
    {
      id:"u4-04", unit:"u4", type:"multi", tag:"Nonsense & wordplay",
      prompt:"A nonsense word has no stable dictionary meaning but carries comic sound and rhythm. Select the TWO strongest translation priorities.",
      options:[
        {id:"a", text:"Create an Arabic form with comparable play, sound and contextual suggestion."},
        {id:"b", text:"Read the candidate aloud inside the full line or stanza."},
        {id:"c", text:"Replace it with a long literal explanation inside the poem."},
        {id:"d", text:"Delete it because dictionaries cannot define it."}
      ], answer:["a","b"],
      rationale:"Nonsense translation is creative but disciplined: rebuild the aural and contextual effect, then test the result in performance."
    },
    {
      id:"u4-05", unit:"u4", type:"match", tag:"Performance tests",
      prompt:"Match each feature to its most revealing test.",
      choices:[
        {id:"tune", text:"Sing to the fixed tune"},
        {id:"child", text:"Read to or as a child"},
        {id:"culture", text:"Check target sound convention"},
        {id:"mould", text:"Mark rhyme letters and line lengths"}
      ],
      rows:[
        {id:"r1", text:"Song lyric", answer:"tune"},
        {id:"r2", text:"Young-reader fluency and delight", answer:"child"},
        {id:"r3", text:"Animal cry", answer:"culture"},
        {id:"r4", text:"Limerick", answer:"mould"}
      ],
      rationale:"Different textual functions require different tests; silent semantic comparison alone cannot evaluate performance-oriented children's verse."
    },
    {
      id:"u4-06", unit:"u4", type:"mcq", tag:"Translation brief",
      source:"A familiar nursery song must still be sung to its original melody.",
      prompt:"Version A is semantically close but cannot fit the tune. Version B compresses one image, preserves the central scene and sings naturally. Which judgment is strongest?",
      options:[
        {id:"a", text:"A is necessarily superior because semantic closeness is the only criterion."},
        {id:"b", text:"B is likely more functional for this commission, but the compressed image should still be identified and justified."},
        {id:"c", text:"B is automatically an adaptation and cannot be a translation."},
        {id:"d", text:"Neither can be evaluated without counting dictionary matches."}
      ], answer:"b",
      rationale:"The fixed tune makes singability central. Functional success does not erase semantic accountability: the compression must still be named and weighed."
    },

    {
      id:"u5-01", unit:"u5", type:"mcq", tag:"Speakability",
      prompt:"A dramatic line is lexically accurate, but the Arabic actor must stop twice for breath in the middle of a single urgent outburst. What has the translator failed to test?",
      options:[
        {id:"a", text:"Alphabetical order"},
        {id:"b", text:"Speakability and performance rhythm"},
        {id:"c", text:"Footnote placement"},
        {id:"d", text:"Rhyme scheme"}
      ], answer:"b",
      rationale:"Drama is embodied language. Breath, timing, emphasis and interaction have to work in rehearsal, not only on the page."
    },
    {
      id:"u5-02", unit:"u5", type:"mcq", tag:"Translation or adaptation",
      prompt:"A version moves the action from New York to Riyadh, changes every name and institution, rewrites the social conflict, then labels itself “a faithful translation.” What is the central problem?",
      options:[
        {id:"a", text:"The changes may be defensible as adaptation, but the work is labelled dishonestly."},
        {id:"b", text:"Changing a name is always plagiarism."},
        {id:"c", text:"Drama can never be adapted."},
        {id:"d", text:"The version needs more literal stage directions but no new label."}
      ], answer:"a",
      rationale:"Large contextual and structural changes may create a valid adaptation. Ethical practice requires an honest label and visible account of what changed."
    },
    {
      id:"u5-03", unit:"u5", type:"tf", tag:"Performance",
      prompt:"True or false: A theatre translation is complete once every sentence is accurate on the page; rehearsal can improve acting but cannot reveal translation problems.",
      options:[{id:"t",text:"True"},{id:"f",text:"False"}], answer:"f",
      rationale:"Rehearsal is evidence. Actors expose awkward syntax, lost cues, impossible timing, unclear relationships and lines that do not produce the intended effect."
    },
    {
      id:"u5-04", unit:"u5", type:"multi", tag:"Wordplay",
      prompt:"A stage joke depends on a source-language pun with no direct Arabic equivalent. Select the TWO most defensible responses.",
      options:[
        {id:"a", text:"Create different Arabic wordplay that produces a comparable dramatic effect."},
        {id:"b", text:"Compensate at a nearby performable moment and record the change."},
        {id:"c", text:"Pause the performance for a scholarly footnote every time."},
        {id:"d", text:"Delete the joke silently and claim exact equivalence."}
      ], answer:["a","b"],
      rationale:"Comedy often requires effect-level recreation or compensation. The change should serve performance and be acknowledged, not concealed."
    },
    {
      id:"u5-05", unit:"u5", type:"match", tag:"Commission",
      prompt:"Match each commission to its dominant practical constraint.",
      choices:[
        {id:"print", text:"Literary nuance and readable page style"},
        {id:"subtitles", text:"Brevity and reading speed"},
        {id:"dubbing", text:"Oral naturalness and timing to picture"},
        {id:"stage", text:"Live bodies, space, audience and local production"}
      ],
      rows:[
        {id:"r1", text:"Printed play edition", answer:"print"},
        {id:"r2", text:"Arabic subtitles", answer:"subtitles"},
        {id:"r3", text:"Arabic dubbing", answer:"dubbing"},
        {id:"r4", text:"Saudi stage adaptation", answer:"stage"}
      ],
      rationale:"The same scene legitimately changes across commissions because the medium controls length, timing, embodiment and audience relationship."
    },
    {
      id:"u5-06", unit:"u5", type:"mcq", tag:"Effect & culture",
      source:"Will you let me go, for Christ's sake?",
      prompt:"Version A is formally literal. Version B says «دعني أذهب، أرجوك!» and performs naturally, but softens the source's religious and emotional force. Which evaluation is strongest?",
      options:[
        {id:"a", text:"B is perfect because speakability cancels every semantic issue."},
        {id:"b", text:"A is perfect because literal wording always performs naturally."},
        {id:"c", text:"B gains speakability but reduces force; the commission and intended effect must determine whether that trade is defensible."},
        {id:"d", text:"Both lines are examples of metrical translation."}
      ], answer:"c",
      rationale:"A performance gain and a semantic-cultural loss can coexist. The evaluator should name both and relate the decision to commission, audience and effect."
    }
  ],

  evaluations: [
    {
      id:"e1", unit:"u1", title:"Case 1 · Dialect, style and explanation",
      source:"“Tha's nowt but trouble,” he said, the warning rolling out slowly, almost affectionately.",
      translation:"«وش بلاك يا رجال؟ أنت ما وراك إلا المشاكل»، قالها بلهجة نجدية سريعة.¹\n¹ لهجة يوركشاير لهجة إنجليزية تاريخية مرتبطة بشمال إنجلترا.",
      prompt:"Evaluate the Arabic version in no more than 80 words. Identify TWO specific problems, propose ONE targeted repair, and justify it with ONE Unit 1 concept.",
      guide:[
        "Identifies the false geographic/social relocation created by a recognisable Najdi dialect.",
        "Identifies another material issue: changed pace/affection, added wording, or disruptive explanatory footnote.",
        "Proposes a concrete repair, such as restrained non-specific marked speech plus compensation, while preserving the slow affectionate warning.",
        "Uses a relevant concept accurately: dialect markedness, register, style, interpolation/footnotes, or compensation."
      ]
    },
    {
      id:"e2", unit:"u2", title:"Case 2 · Child voice, inscription and image",
      source:"Picture: a hand-painted KEEP OUT sign hangs crookedly on a child's bedroom door. Narration: “I made the sign myself. The E went backwards, but Mum understood.”",
      translation:"The Arabic edition removes the writing from the picture and prints below it: «لقد قمتُ شخصيًا بصناعة لافتة تحظر الدخول. كان أحد الحروف معكوسًا، إلا أن والدتي أدركت المقصود.»",
      prompt:"Evaluate the Arabic version in no more than 80 words. Identify TWO specific problems, propose ONE targeted repair, and justify it with ONE Unit 2 concept.",
      guide:[
        "Identifies loss of the visual inscription and the text-image joke about the reversed letter.",
        "Identifies the over-formal adult register that erases a child's voice and comic immediacy.",
        "Proposes an integrated repair: redesign an Arabic child-made sign inside the image, including a plausible reversed/misformed letter, and use child-natural narration.",
        "Uses a relevant concept accurately: multimodality, inscriptions, visual congruity, child voice, or reader address."
      ]
    },
    {
      id:"e3", unit:"u3", title:"Case 3 · Poetry strategy and central image",
      source:"Tyger Tyger, burning bright, / In the forests of the night; / What immortal hand or eye, / Could frame thy fearful symmetry?",
      translation:"«أيها النمر، أنت موجود في الغابة ليلًا. من الذي صنعك بهذه الصورة؟»\nStudent label: Rhymed translation.",
      prompt:"Evaluate the Arabic version in no more than 80 words. Identify TWO specific problems, propose ONE targeted repair, and justify it with ONE Unit 3 concept.",
      guide:[
        "Identifies the false strategy label: the version is closer to compressed verse-to-prose/literal paraphrase than rhymed translation.",
        "Identifies a major poetic loss such as repetition, burning brightness, fearful symmetry, lineation, sound or rhetorical intensity.",
        "Proposes a targeted repair tied to a declared strategy—for example, restore the central fire/night image and build a consistent rhyme or sound pattern.",
        "Uses a relevant concept accurately: one of the six strategies, imagery/metaphor, rhyme, phonemic effect, or explicit loss-gain trade-off."
      ]
    },
    {
      id:"e4", unit:"u4", title:"Case 4 · Song, rhythm and sound-play",
      source:"Hickory, dickory, dock, / The mouse ran up the clock. / The clock struck one, / The mouse ran down, / Hickory, dickory, dock.",
      translation:"«هيكوري وديكوري ودوك، ركض الفأر الصغير بسرعة شديدة إلى أعلى الساعة الكبيرة، وعندما أعلنت الساعة أن الوقت أصبح الواحدة، عاد الفأر إلى الأسفل.»",
      prompt:"Evaluate the Arabic version in no more than 80 words. Identify TWO specific problems, propose ONE targeted repair, and justify it with ONE Unit 4 concept.",
      guide:[
        "Identifies loss of singable line lengths, beat and the repeated nonsense refrain.",
        "Identifies another material loss: rhyme, comic speed, sound-play, repetition or child-friendly concision.",
        "Proposes a concise performable repair, including an Arabic sound/refrain tested against the tune or clapped rhythm.",
        "Uses a relevant concept accurately: singability, read-aloud testing, nonsense, rhythm/rhyme, compensation, or child audience."
      ]
    },
    {
      id:"e5", unit:"u5", title:"Case 5 · Literal dialogue and stage effect",
      source:"MARA: You call that justice?\nSAM: I call it Tuesday.\n[He returns to his paperwork without looking up.]",
      translation:"مارا: هل تسمّي ذلك عدالة؟\nسام: أنا أسمّي ذلك يوم الثلاثاء.\n[يضحك الجمهور، ثم ينظر سام إلى مارا بحزن.]",
      prompt:"Evaluate the Arabic version in no more than 80 words. Identify TWO specific problems, propose ONE targeted repair, and justify it with ONE Unit 5 concept.",
      guide:[
        "Identifies that the literal Tuesday reply may not reproduce the deadpan idiomatic effect in Arabic without performance support or recreation.",
        "Identifies the invented audience laughter and changed stage action/emotion, which reverse the source's refusal to engage.",
        "Proposes a speakable repair that preserves the dismissive routine or recreates it through functional Arabic wordplay, while restoring the stage direction.",
        "Uses a relevant concept accurately: speakability, performance evidence, dominant effect, compensation, commission, or translation-versus-adaptation labelling."
      ]
    }
  ]
};
})();
