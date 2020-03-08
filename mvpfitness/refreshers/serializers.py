from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import *
from dict import dict
from datetime import datetime

now = datetime.now()
# class RefresherSerializers(ModelSerializer):
#
# class Meta:
#         model = Refresher
#         fields = ('id', 'fitness_id', 'session_name', 'number_of_poses', 'estimated_time', 'pose_details')
#
#     def create(self, validated_data):
#         # drawing_lines = validated_data.get('file').get_records()
#         # user = self.context['request'].user
#         # purchase = validated_data['purchase_id']
#         # validated_data['project_id'] = purchase.project_id
#         # validated_data['vendor_id'] = purchase.vendor_id
#         # drawing = ShopDrawing.objects.get(id=19)
#         # # ShopDrawing.objects.create(**validated_data, created_by=user)
#         # total_quantity = 0
#         # total_net_weight = 0.0
#         # total_painting_weight = 0.0
#         # total_fireproofing_weight = 0.0
#         # lines = []
#         # reporting = []
#         # for line in drawing_lines:
#         #     total_quantity = total_quantity + line['quantity']
#         #     total_net_weight = total_net_weight + (line['quantity'] * line['mark_unit_weight'])
#         #     total_painting_weight = total_painting_weight + (line['quantity'] * line['painting_unit_Weight'])
#         #     total_fireproofing_weight = total_fireproofing_weight + (line['quantity'] *
#         #                                                              line['fireproofing_unit_Weight'])
#         #     # print(line)
#         #     lines.append(ShopDrawingLines(
#         #         created_by=user,
#         #         shop_drawing_id=drawing,
#         #         mark=line['mark'],
#         #         rev_no=line['rev_no'],
#         #         document_no=line['document_no'],
#         #         wbs=line['wbs'],
#         #         construction_area=line['construction_area'],
#         #         quantity=line['quantity'],
#         #         mark_length=line['mark_length'],
#         #         profile_unit_weight=line['profile_unit_weight'],
#         #         mark_unit_weight=line['mark_unit_weight'],
#         #         mr_no=line['mr_no'],
#         #         mark_surface_paint=line['mark_surface_paint'],
#         #         profile=line['profile'],
#         #         material_grade=line['material_grade'],
#         #         structure_role=line['structure_role'],
#         #         painting_unit_Weight=line['painting_unit_Weight'],
#         #         mark_surface_fireproofing=line['mark_surface_fireproofing'],
#         #         fireproofing_unit_Weight=line['fireproofing_unit_Weight'],
#         #         shop_drawing_no=line['shop_drawing_no'],
#         #         mark_commodity_code=line['mark_commodity_code'],
#         #         paint_commodity_code=line['paint_commodity_code'],
#         #         fire_commodity_code=line['fire_commodity_code'],
#         #         po_ref_mark=line['po_ref_mark'],
#         #         po_ref_paint=line['po_ref_paint'],
#         #         po_ref_fireproofing=line['po_ref_fireproofing'],
#         #         hs_code=line['hs_code'],
#         #         pl_number=line['pl_number'],
#         #         priority=line['priority'],
#         #         mark_total_weight=line['mark_total_weight'],
#         #         painting_total_weight=line['painting_total_weight'],
#         #         fireproofing_total_Weight=line['fireproofing_total_Weight'],
#         #         is_bolt=line['is_bolt'],
#         #         available_quantity=line['quantity'],
#         #     ))
#         #
#         #     report = [Reporting(
#         #         project_id=purchase.project_id.id,
#         #         purchase_id=purchase.number,
#         #         structure_id=drawing.structure_id,
#         #         structure_name=drawing.structure_name,
#         #         uom_name='',
#         #         uom_category='',
#         #         lot=line['lot'],
#         #         sub_lot=line['sub_lot'],
#         #         mark=line['mark'],
#         #         rev_no=line['rev_no'],
#         #         document_no=line['document_no'],
#         #         quantity=line['quantity'],
#         #         mark_length=line['mark_length'],
#         #         profile_unit_weight=line['profile_unit_weight'],
#         #         profile=line['profile'],
#         #         mark_unit_weight=line['mark_unit_weight'],
#         #         mark_surface_paint=line['mark_surface_paint'],
#         #         structure_role=line['structure_role'],
#         #         painting_unit_weight=line['painting_unit_Weight'],
#         #         mark_surface_fireproofing=line['mark_surface_fireproofing'],
#         #         fireproofing_unit_weight=line['fireproofing_unit_Weight'],
#         #         hs_code=line['hs_code'],
#         #         pl_number=line['pl_number']
#         #     )]
#         #     reporting.extend(report)
#         #     # if not line['is_bolt']:
#         #     #     report = report * line['quantity']
#         #     # reporting.extend(report)
#         #
#         # ShopDrawingLines.objects.bulk_create(lines)
#         # Reporting.objects.bulk_create(reporting)
#         # drawing.total_quantity = total_quantity
#         # drawing.total_net_weight = total_net_weight
#         # drawing.total_painting_weight = total_painting_weight
#         # drawing.total_fireproofing_weight = total_fireproofing_weight
#         # drawing.save()
#         return drawing


class PoseDetailSerializers(ModelSerializer):
    ml_model_pose_name = SerializerMethodField('ml_model_name')

    def ml_model_name(self, routine_poses):
        return routine_poses.pose_id.ml_model_pose_name

    class Meta:
        model = PosesRoutine
        fields = ('id', 'ml_model_pose_name', 'holding_time')


class UserPoseSerializers(ModelSerializer):
    class Meta:
        model = UserRoutine
        fields = ('user_id', 'routine_id', 'pose_id', 'device_type', 'version', 'browser', 'browser_version', 'os',
                  'start_time', 'end_time', 'session_type', 'impression_count', 'ip_address', 'comments',
                  'user_duration', 'pose_accuracy')

    def create(self, validated_data):
        user = self.context['request'].user
        user_routine = UserRoutine(**validated_data)
        user_routine.created_by = user
        user_routine.created_at = now
        user_routine.save()
        return user_routine


class RoutineSerializer(ModelSerializer):

    class Meta:
        model = Routine
        fields = ('id', 'routing_name', 'difficulty')


class PosesSerializer(ModelSerializer):

    class Meta:
        model = Poses
        fields = ('id', 'fitness_id', 'pose_name', 'ml_model_pose_name', 'difficulty', 'image_url')


class RoutinePosesSerializer(ModelSerializer):

    class Meta:
        model = PosesRoutine
        fields = ('id', 'pose_id', 'routine_id', 'holding_time', 'position')