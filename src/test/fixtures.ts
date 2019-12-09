export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultEntryFixture = fixtureFactory<VinResultEntry>({
    Make: "Ford",
    Model: "Foo",
    ModelYear: "108",
    Trim: "test",
    VehicleType: "foo"
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})
