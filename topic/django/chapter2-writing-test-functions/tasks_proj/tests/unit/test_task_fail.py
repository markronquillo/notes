from tasks import Task

def test_task_quality():
    """Different tasks should not be equal."""
    t1 = Task('sit there', 'brian')
    t2 = Task('do something', 'okken')
    assert t1 == t2

def test_dict_equality():
    """Different tasks compared as dicts should note be equal."""
    t1_dict = Task('Make sandwich', 'brian')._asdict()
    t2_dict = Task('Make sandwich', 'okken')._asdict()
    assert t1_dict == t2_dict