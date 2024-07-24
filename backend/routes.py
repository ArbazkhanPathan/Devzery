from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, TestCase

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    CORS(app)

    @app.route('/testcases', methods=['GET'])
    def get_test_cases():
        testcases = TestCase.query.order_by(TestCase.id).all()  # Sort by ID
        return jsonify([tc.to_dict() for tc in testcases])


    @app.route('/testcases', methods=['POST'])
    def create_test_case():
        data = request.get_json()
        new_testcase = TestCase(
            name=data['name'],
            estimate_time=data['estimate_time'],
            module=data['module'],
            priority=data['priority'],
            status=data['status']
        )
        db.session.add(new_testcase)
        db.session.commit()
        return jsonify(new_testcase.to_dict()), 201

    @app.route('/testcases/<int:id>', methods=['PUT'])
    def update_test_case(id):
        data = request.get_json()
        testcase = TestCase.query.get(id)
        if not testcase:
            return jsonify({'error': 'Not found'}), 404

        testcase.name = data.get('name', testcase.name)
        testcase.estimate_time = data.get('estimate_time', testcase.estimate_time)
        testcase.module = data.get('module', testcase.module)
        testcase.priority = data.get('priority', testcase.priority)
        testcase.status = data.get('status', testcase.status)
        db.session.commit()
        return jsonify(testcase.to_dict())

    @app.route('/testcases/<int:id>', methods=['DELETE'])
    def delete_test_case(id):
        testcase = TestCase.query.get(id)
        if not testcase:
            return jsonify({'error': 'Not found'}), 404

        db.session.delete(testcase)
        db.session.commit()
        return '', 204

    return app
