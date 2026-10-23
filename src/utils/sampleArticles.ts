import { SampleArticle } from '../types/detector';

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'user-invisibility-water',
    category: 'User Test Case',
    title: 'Scientists Claim That Drinking One Glass of Water Makes People Invisible for 10 Minutes',
    badge: 'Your Test Case',
    description: 'The exact test article you provided featuring "fictional research group" and impossible optical claims.',
    expectedVerdict: 'FAKE',
    content: `Scientists Claim That Drinking One Glass of Water Makes People Invisible for 10 Minutes.

A fictional research group has announced that drinking a special glass of water every morning can make a person invisible for ten minutes. According to the imaginary report, the water contains a secret ingredient that bends light around the human body. The researchers claim that this discovery could revolutionize transportation, security, and everyday life.`,
  },
  {
    id: 'lunar-water-nasa',
    category: 'Verified News',
    title: 'NASA Confirms Water Molecules Discovered on Sunlit Surface of the Moon',
    badge: 'Verified Truth',
    description: 'Peer-reviewed NASA SOFIA airborne observatory discovery published in Nature Astronomy.',
    expectedVerdict: 'REAL',
    content: `NASA Confirms Water Molecules Discovered on Sunlit Surface of the Moon.

NASA's Stratospheric Observatory for Infrared Astronomy (SOFIA) has confirmed, for the first time, water on the sunlit surface of the Moon. This discovery indicates that water may be distributed across the lunar surface, and not limited to cold, shadowed places. Results were published in the peer-reviewed journal Nature Astronomy. SOFIA detected water molecules (H2O) in Clavius Crater, one of the largest craters visible from Earth, situated in the Moon's southern hemisphere.`,
  },
  {
    id: 'six-days-darkness',
    category: 'Viral Hoax',
    title: 'NASA Confirms Earth Will Experience 6 Days of Complete Darkness in December',
    badge: 'Viral Hoax',
    description: 'Classic recurring internet hoax claiming a solar storm will block out the sun.',
    expectedVerdict: 'FAKE',
    content: `NASA Confirms Earth Will Experience 6 Days of Complete Darkness in December.

The news broke across social platforms that NASA has issued a global alert stating the world will experience 6 days of total darkness from December 16 to 22. According to unsourced claims, the agency chief stated that a giant solar storm will eject dust and space debris that will completely block out the sun for nearly a week. Officials urge citizens to prepare candles and emergency rations.`,
  },
  {
    id: 'satire-onion-mondays',
    category: 'Satire',
    title: 'Congress Unanimously Votes to Repeal Mondays Following Heated Debate',
    badge: 'Satire / Parody',
    description: 'Humorous political satire illustrating how satirical disclaimers and absurd premises are classified.',
    expectedVerdict: 'FAKE',
    content: `Congress Unanimously Votes to Repeal Mondays Following Heated Debate.

In a rare display of bipartisan cooperation, the United States Congress voted 435 to 0 on Tuesday to officially abolish Mondays from the calendar. The satirical bill, introduced by a spokesperson for tired citizens everywhere, aims to eliminate morning alarms and back-to-work dread. Economists from an imaginary think tank celebrated the decision, suggesting humans begin the week on Wednesday instead.`,
  },
  {
    id: 'miracle-lemon-cure',
    category: 'Pseudoscience',
    title: 'Hot Lemon Water Proven 10,000 Times Stronger Than Chemotherapy, Doctors Conceal',
    badge: 'Medical Misinformation',
    description: 'Dangerous viral medical misinformation with fabricated efficacy multipliers.',
    expectedVerdict: 'FAKE',
    content: `Hot Lemon Water Proven 10,000 Times Stronger Than Chemotherapy, Doctors Conceal.

An anonymous research team claims that drinking hot lemon water destroys malignant cancer cells ten thousand times more effectively than chemotherapy. The viral post claims that pharmaceutical executives and hospitals have kept this ancient secret hidden from the public to protect trillion-dollar profits. The report cites no hospital trials, no medical journal, and no oncological consensus.`,
  },
];
