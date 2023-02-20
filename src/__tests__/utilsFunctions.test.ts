import { differenceIsMoreThanADay } from '@/shared/utilsFunctions'

describe('utilsFunctions', () => {
  it('should return false if 2 dates has no more than 1 day of difference', () => {
    const result = differenceIsMoreThanADay(new Date(), new Date())
    expect(result).toBeFalsy()
  })
  it('should return true if 2 dates has more than 1 day of difference', () => {
    const result = differenceIsMoreThanADay(new Date('2/3/2023'), new Date('3/3/2023'))
    expect(result).toBeTruthy()
    const result2 = differenceIsMoreThanADay(new Date('3/3/2023'), new Date('2/3/2023'))
    expect(result2).toBeTruthy()
  })
})
