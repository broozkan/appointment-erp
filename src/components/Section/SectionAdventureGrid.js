import React from 'react'
import { getTranslatedString } from '../../controllers/controller'

const SectionAdventureGrid = () => {
	return (
		<div class="banner-adventure-grid-wrapper  mb-0">
			<div class="opacity-mask p-5" data-opacity-mask="rgba(0, 0, 0, 0.3)">
				<div class="main_title_3"><span><em></em></span>
					<h2 className="text-white">
						{getTranslatedString('adventure_grid_h2')}
					</h2>
					<p className="text-white">
						{getTranslatedString('adventure_grid_p')}
					</p>
				</div>
				<div className="row">
					<div class="col-xl-6 col-lg-6 col-md-6">
						<a href="/seferler?category_id=601b0f2d73ffa82ce46161f4&adult_count=1&child_count=0" class="grid_item latest_adventure">
							<figure>
								<div class="info">
									<em>{getTranslatedString('adventure_grid_with_unique_view')}</em>
									<h3>{getTranslatedString('adventure_grid_make_balloon_tour')}</h3>
								</div>
							</figure>
						</a>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6">
						<div className="row">
							<div class="col-xl-6 col-lg-6 col-md-6">
								<a href="/seferler?category_id=600d36ef6c804215a8877723&adult_count=1&child_count=0" class="grid_item latest_adventure">
									<figure>
										<div class="info">
											<em>{getTranslatedString('adventure_grid_discover')}</em>
											<h3>{getTranslatedString('adventure_grid_discover_valleys')}</h3>
										</div>
									</figure>
								</a>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6">
								<a href="restaurant-detail.html" class="grid_item latest_adventure">
									<figure>
										<div class="info">
											<em>{getTranslatedString('adventure_grid_excitement')}</em>
											<h3>{getTranslatedString('adventure_grid_safari')}</h3>
										</div>
									</figure>
								</a>
							</div>
							<div class="col-xl-8 col-lg-6 col-md-6">
								<a href="/seferler?category_id=600d3cc5d0df7c1a74ed968d&adult_count=1&child_count=0" class="grid_item latest_adventure">
									<figure>
										<div class="info">
											<em>{getTranslatedString('adventure_grid_history')}</em>
											<h3>{getTranslatedString('adventure_grid_underground_city')}</h3>
										</div>
									</figure>
								</a>
							</div>
							<div class="col-xl-4 col-lg-6 col-md-6">
								<a href="/seferler?category_id=601b0fbc73ffa82ce46161f5&adult_count=1&child_count=0" class="grid_item latest_adventure">
									<figure>
										<div class="info">
											<em>{getTranslatedString('adventure_grid_feel_good')}</em>
											<h3>{getTranslatedString('adventure_grid_pose')}</h3>
										</div>
									</figure>
								</a>
							</div>
						</div>

					</div>

				</div>
				<div className="row">

				</div>
			</div>
		</div>
	)
}

export default SectionAdventureGrid