define([
    './pages/alarms.js',
    './pages/groups.js',
    './pages/instructors.js',
    './pages/profiles.js',
    './pages/salary.js',
    './pages/schedule.js',
    './pages/teachers.js',
    './pages/debt.js'
], function (
    AlarmsPage,
    GroupsPage,
    InstructorsPage,
    ProfilesPage,
    SalaryPage,
    SchedulePage,
    TeachersPage,
    DebtPage
) {
    return {
        groups: new GroupsPage(),
        teachers: new TeachersPage(),
        schedule: new SchedulePage(),
        instructors: new InstructorsPage(),
        salary: new SalaryPage(),
        profiles: new ProfilesPage(),
        alarms: new AlarmsPage(),
        debt: new DebtPage()
    };
});