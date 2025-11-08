import { Chant } from '../types/chant'

export const chants: Chant[] = [
  {
    id: 'repentance-samadhi',
    title: '忏悔三昧讨债法',
    description: '业障忏悔与功德回向的修持方法',
    readingTime: 5,
    content: `忏悔三昧讨债法

无论是过去，现在，或是未来。因身，口，意的造作，被我伤害过的(因缘)众生。或因身，口，意的造作，所招感的诸多不顺和苦难不管是身体上的，还是精神上的。我都愿意接受(业果法则)。并惭愧的忏悔因为无明，因未闻四种真谛，无量劫来，我们彼此伤害，冤冤相报，枉受诸苦于六道中，无有出期。我们都希望解脱。

愿一切被我伤害过的众生，无精神的痛苦，无身体的痛苦，愿你们保持快乐。

愿一切与我有因缘的鬼道，非人众生，得闻佛法，投生善道，趋向解脱。

愿一切与我有因缘的人或非人众生，分享我善业的功德。

并回答 善哉!善哉!善哉!

愿一切众生分享我的功德。

回向: 愿以此功德回向给XXX，请尽虚空遍法界十方三世诸神佛、护法圣众加持他，愿他早消业障，顺缘俱足，福慧善根增长，离苦得厂往生净土。`
  }
]

/**
 * Retrieves a chant by its unique identifier
 * Used by TanStack Router loaders for detail routes
 *
 * @param id - The unique chant identifier
 * @returns The matching chant or undefined if not found
 */
export function getChantById(id: string): Chant | undefined {
  return chants.find(c => c.id === id)
}
