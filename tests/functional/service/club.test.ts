import test from 'japa';
import sinon from 'sinon';
import ClubService from '#services/club_service';
import Club from '#models/club';

test.group('ClubService', (group) => {
  let clubService: ClubService;
  let clubMock: sinon.SinonStubbedInstance<Club>;

  group.beforeEach(() => {
    // Setup
    clubMock = sinon.createStubInstance(Club);
    clubService = new ClubService();
    // Inject the stubbed instance of Club into ClubService
    clubService.club = clubMock;
  });

  test('Create Club', async (assert) => {
    const clubData = {
      name: 'Test Club',
      logo: 'test_logo.png',
      description: 'This is a test club',
      phone: '123456789',
      email: 'test@test.com',
      location: 'Test Location',
      facebook: 'test_facebook',
      twitter: 'test_twitter'
    };

    // Stub the create method of Club to resolve with a mocked club object
    clubMock.create.resolves({ id: 1, ...clubData });

    const createdClub = await clubService.createClub(clubData);

    assert.exists(createdClub.id);
    assert.equal(createdClub.name, clubData.name);
    assert.equal(createdClub.logo, clubData.logo);
    assert.equal(createdClub.description, clubData.description);
    assert.equal(createdClub.phone, clubData.phone);
    assert.equal(createdClub.email, clubData.email);
    assert.equal(createdClub.location, clubData.location);
    assert.equal(createdClub.facebook, clubData.facebook);
    assert.equal(createdClub.twitter, clubData.twitter);
  });
});
