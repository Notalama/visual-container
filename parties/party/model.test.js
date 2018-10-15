import { Party } from '.'

let party

beforeEach(async () => {
  party = await Party.create({ list: 'test', count: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = party.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(party.id)
    expect(view.list).toBe(party.list)
    expect(view.count).toBe(party.count)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = party.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(party.id)
    expect(view.list).toBe(party.list)
    expect(view.count).toBe(party.count)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
