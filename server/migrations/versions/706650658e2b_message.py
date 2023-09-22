"""message

Revision ID: 706650658e2b
Revises: 62271ca4d138
Create Date: 2023-09-22 03:23:42.559726

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '706650658e2b'
down_revision = '62271ca4d138'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friendies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('friendie_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['friendie_id'], ['users.id'], name=op.f('fk_friendies_friendie_id_users')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_friendies_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('friendies')
    # ### end Alembic commands ###