from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TestCase(db.Model):
    __tablename__ = 'testcases' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    estimate_time = db.Column(db.String(80), nullable=False)
    module = db.Column(db.String(80), nullable=False)
    priority = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'estimate_time': self.estimate_time,
            'module': self.module,
            'priority': self.priority,
            'status': self.status
        }
